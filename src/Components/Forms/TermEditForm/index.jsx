import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Button, Col, Form, Input, notification, Row } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LearningLevelSelect from "../../Inputs/LearningLevelSelect";
import normalize from "../../../textNormalizer";
import LanguageSelect from "../../Inputs/LanguageSelect";
import styles from "./TermEditForm.module.scss";
import {
  createTermAction,
  editTermAction,
  dictionaryTermMeaningAction,
  setEditingTermAction
} from "../../../Actions/TermAction";
import { selectEditingTermValue } from "../../../Selectors/TermSelectors";
import { selectDictionaryLanguage } from "../../../Selectors/UserSelectors";
import { TermLearningLevel, getNextLearningLevel } from "../../../Enums";
import { importantColors } from "../../Term/TermTooltip";

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
      index
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
      const { code } = languages.find(l => l.code === languageCode);
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
  }

  handleSubmit = values => {
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

  handleBetter = e => {
    const { value } = this.props;
    e.preventDefault();
    const newValue = {
      ...value,
      learningLevel: getNextLearningLevel(value.learningLevel)
    };
    this.formRef.current.setFieldsValue(newValue);
    this.handleSubmit(newValue);
  };

  render() {
    const { value, className, editingTerm } = this.props;
    if (!editingTerm) {
      return null;
    }

    const { lookingUpDictionary } = this.state;
    return (
      <Form onFinish={this.handleSubmit} layout="inline" ref={this.formRef}>
        <div className={`${className} ${styles.form}`}>
          <CopyToClipboard
            text={value.content}
            onCopy={() =>
              notification.info({ message: "Copied to clipboard." })
            }
          >
            <div
              className={styles.title}
              style={{ color: importantColors[Math.min(value.count, 49)] }}
            >
              {`${value.content}(${value.count ?? "-"})`}
            </div>
          </CopyToClipboard>
          <Form.Item
            className={styles.content}
            label="Content"
            name="content"
            initialValue={value.content}
          >
            <React.Fragment>
              <Input disabled />
            </React.Fragment>
          </Form.Item>
          <Form.Item
            className={styles.language}
            name="languageCode"
            initialValue={value.languageCode}
          >
            <LanguageSelect disabled />
          </Form.Item>

          <Row>
            <Col xl={10} lg={12} xs={24}>
              <Form.Item
                name="meaning"
                initialValue={value.meaning}
                className={styles.meaning}
              >
                <Input.TextArea
                  disabled={
                    lookingUpDictionary ||
                    (value.learningLevel !== TermLearningLevel.UnKnow &&
                      value.meaning === undefined)
                  }
                  autosize={{ maxRows: 3, minRows: 2 }}
                  placeholder="Meaning"
                  cols={60}
                />
              </Form.Item>
            </Col>
            <Col xl={10} lg={12} xs={24}>
              <Form.Item
                name="learningLevel"
                initialValue={value.learningLevel}
                className={styles.learningLevel}
              >
                <LearningLevelSelect />
              </Form.Item>
            </Col>
            <Col xl={4} lg={24} xs={24}>
              <Row gutter={1}>
                <Col xs={12} lg={24}>
                  <Form.Item className={styles.saveButton}>
                    <Button
                      type="primary"
                      onClick={this.handleBetter}
                      disabled={
                        lookingUpDictionary ||
                        (value.learningLevel !== TermLearningLevel.UnKnow &&
                          value.meaning === undefined)
                      }
                      className={styles.saveButton}
                    >
                      Better
                    </Button>
                  </Form.Item>
                </Col>
                <Col xs={12} lg={24} l>
                  <Form.Item className={styles.saveButton}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={
                        lookingUpDictionary ||
                        (value.learningLevel !== TermLearningLevel.UnKnow &&
                          value.meaning === undefined)
                      }
                      className={styles.saveButton}
                    >
                      Save
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
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
  index: null
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
    content: PropTypes.string
  }),
  dictionaryTerm: PropTypes.func.isRequired,
  index: PropTypes.number
};
export default connect(
  state => ({
    value: { ...selectEditingTermValue(state) },
    dictionaryLanguage: selectDictionaryLanguage(state),
    editingTerm: state.term.editingTerm,
    languageCode: state.text.readingText.languageCode,
    languages: state.language.languages,
    index: state.term.editingTerm
  }),
  {
    setEditingTerm: setEditingTermAction,
    createTerm: createTermAction,
    editTerm: editTermAction,
    dictionaryTerm: dictionaryTermMeaningAction
  }
)(TermEditForm);
