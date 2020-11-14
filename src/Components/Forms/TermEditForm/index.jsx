import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Form, Input } from "antd";
import { TextField, Button } from "@material-ui/core";
import TermContent from "./TermContent";
import LearningLevelSelect from "../../Inputs/LearningLevelSelect";
import normalize from "../../../textNormalizer";
import LanguageSelect from "../../Inputs/LanguageSelect";
import styles from "./TermEditForm.module.scss";
import {
  createTermAction,
  editTermAction,
  dictionaryTermMeaningAction,
  setEditingTermAction,
} from "../../../Actions/TermAction";
import { selectEditingTermValue } from "../../../Selectors/TermSelectors";
import { selectDictionaryLanguage } from "../../../Selectors/UserSelectors";
import { TermLearningLevel, getNextLearningLevel } from "../../../Enums";

class TermEditForm extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = { lookingUpDictionary: false, lookedUpDictionary: false };
  }

  componentDidUpdate(prevProps) {
    const {
      value,
      dictionaryLanguage,
      languages,
      languageCode,
      dictionaryTerm,
      index,
    } = this.props;

    const { lookedUpDictionary } = this.state;
    if (index !== prevProps.index) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ lookedUpDictionary: false });
    }

    if (
      // meaning is loaded but empty
      value.content &&
      // unknown term
      value.meaning === "" &&
      !lookedUpDictionary
    ) {
      const { code } = languages.find((l) => l.code === languageCode);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        { lookingUpDictionary: true, lookedUpDictionary: true },
        () =>
          dictionaryTerm(
            normalize(value.content, code),
            languageCode,
            dictionaryLanguage,
            index
          ).finally(() => this.setState({ lookingUpDictionary: false }))
      );
    }
    if (value.index !== prevProps.value.index) {
      if (this.formRef.current) {
        this.formRef.current.setFieldsValue({ ...value });
      }
    } else if (value.meaning !== prevProps.value.meaning) {
      if (this.formRef.current) {
        this.formRef.current.setFieldsValue({ meaning: value.meaning });
      }
    }
  }

  handleSubmit = (values) => {
    const { value, createTerm, editTerm, setEditingTerm } = this.props;
    const editedData = values;
    const editedTerm = { ...value, ...editedData };
    if (!value.id) {
      createTerm(editedTerm);
    } else {
      editTerm(editedTerm);
    }
    setEditingTerm(null);
  };

  handleBetter = (e) => {
    const value = this.formRef.current.getFieldsValue();
    e.preventDefault();
    const newValue = {
      ...value,
      learningLevel: getNextLearningLevel(value.learningLevel),
    };
    this.formRef.current.setFieldsValue(newValue);
    this.handleSubmit(newValue);
  };

  isActionDisabled = () => {
    const { lookingUpDictionary } = this.state;
    const { value } = this.props;
    return (
      lookingUpDictionary ||
      (value.learningLevel !== TermLearningLevel.UnKnow &&
        value.meaning === null)
    );
  };

  render() {
    const { value, className, editingTerm } = this.props;
    if (editingTerm == null || !value) {
      return null;
    }

    return (
      <Form onFinish={this.handleSubmit} layout="inline" ref={this.formRef}>
        <div className={`${className} ${styles.form}`}>
          <TermContent term={value} />
          <Form.Item
            className={styles.content}
            label="Content"
            name="content"
            initialValue={value.content}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            className={styles.language}
            name="languageCode"
            initialValue={value.languageCode}
          >
            <LanguageSelect disabled />
          </Form.Item>

          <Form.Item
            name="meaning"
            initialValue={value.meaning || ""}
            className={styles.meaning}
          >
            <TextField
              key="meaning"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              label="Meaning"
              disabled={this.isActionDisabled()}
              fullWidth
              rows={2}
              rowsMax={4}
              multiline
            />
          </Form.Item>
          <Form.Item
            name="learningLevel"
            initialValue={value.learningLevel}
            className={styles.learningLevel}
          >
            <LearningLevelSelect />
          </Form.Item>
          <div className={styles.buttons}>
            <div className={styles.saveButton}>
              <Button
                color="primary"
                variant="contained"
                onClick={this.handleBetter}
                disabled={this.isActionDisabled()}
                className={styles.saveButton}
              >
                Better
              </Button>
            </div>
            <div className={styles.saveButton}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={this.isActionDisabled()}
                className={styles.saveButton}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

TermEditForm.defaultProps = {
  className: "",
  editingTerm: "",
  value: null,
  dictionaryLanguage: null,
  index: null,
};

TermEditForm.propTypes = {
  className: PropTypes.string,
  createTerm: PropTypes.func.isRequired,
  dictionaryLanguage: PropTypes.string,
  editTerm: PropTypes.func.isRequired,
  editingTerm: PropTypes.number,
  form: PropTypes.shape({}).isRequired,
  languageCode: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setEditingTerm: PropTypes.func.isRequired,
  value: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    index: PropTypes.number.isRequired,
    meaning: PropTypes.string,
  }),
  dictionaryTerm: PropTypes.func.isRequired,
  index: PropTypes.number,
};
export default connect(
  (state) => ({
    value: { ...selectEditingTermValue(state) },
    dictionaryLanguage: selectDictionaryLanguage(state),
    editingTerm: state.term.editingTerm,
    languageCode: state.text.readingText.languageCode,
    languages: state.language.languages,
    index: state.term.editingTerm,
  }),
  {
    setEditingTerm: setEditingTermAction,
    createTerm: createTermAction,
    editTerm: editTermAction,
    dictionaryTerm: dictionaryTermMeaningAction,
  }
)(TermEditForm);
