import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, notification } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LearningLevelSelect from "../../Inputs/LearningLevelSelect";
import LanguageSelect from "../../Inputs/LanguageSelect";
import styles from "./TermEditForm.module.scss";
import {
  createTermAction,
  editTermAction,
  getEditingTermMeaningAction,
  setEditingTermAction
} from "../../../Actions/TermAction";

class TermEditForm extends React.Component {
  componentDidMount() {
    const { value, getEditingTermMeaning, languages, language } = this.props;
    if (value && value.meaning === null) {
      getEditingTermMeaning(
        value.content,
        languages.find(l => l.id === language).code
      );
    }
  }

  componentDidUpdate(prevProps) {
    const { value, getEditingTermMeaning, languages, language } = this.props;
    if (
      (!prevProps.value || !value.id || value.id !== prevProps.value.id) &&
      value.meaning === null
    ) {
      getEditingTermMeaning(
        value.content,
        languages.find(l => l.id === language).code
      );
    }
  }

  handleSubmit = e => {
    const {
      form: { getFieldsValue },
      value,
      createTerm,
      editTerm,
      setEditingTerm
    } = this.props;
    e.preventDefault();
    const editedData = getFieldsValue();
    const editedTerm = { ...value, ...editedData };
    if (!value.id) {
      createTerm(editedTerm);
    } else {
      editTerm(editedTerm);
    }
    setEditingTerm(null);
  };

  render() {
    const {
      form: { getFieldDecorator },
      value,
      language
    } = this.props;
    if (!value) {
      return null;
    }
    return (
      <Form
        onSubmit={this.handleSubmit}
        layout="inline"
        className={styles.form}
      >
        <CopyToClipboard
          text={value.content}
          onCopy={() => notification.info({ message: "Copied to clipboard." })}
        >
          <div className={styles.title}>{value.content}</div>
        </CopyToClipboard>
        <Form.Item className={styles.content} label="Content">
          {getFieldDecorator("content", { initialValue: value.content })(
            <Input disabled />
          )}
        </Form.Item>
        <Form.Item className={styles.language} label="Language">
          {getFieldDecorator("language", { initialValue: language })(
            <LanguageSelect disabled />
          )}
        </Form.Item>
        <Form.Item label="Meaning" className={styles.meaning}>
          {getFieldDecorator("meaning", { initialValue: value.meaning })(
            <Input.TextArea
              autosize={{ maxRows: 3, minRows: 1 }}
              placeholder="Meaning"
              cols={60}
            />
          )}
        </Form.Item>
        <Form.Item label="Learning Level">
          {getFieldDecorator("learningLevel", {
            initialValue: value.learningLevel
          })(<LearningLevelSelect />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.saveButton}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(
  state => ({
    value: state.term.editingTerm,
    language: state.text.readingText.language,
    languages: state.language.languages
  }),
  {
    setEditingTerm: setEditingTermAction,
    createTerm: createTermAction,
    editTerm: editTermAction,
    getEditingTermMeaning: getEditingTermMeaningAction
  }
)(Form.create()(TermEditForm));

TermEditForm.defaultProps = {
  value: null
};

TermEditForm.propTypes = {
  form: PropTypes.shape({}).isRequired,
  createTerm: PropTypes.func.isRequired,
  setEditingTerm: PropTypes.func.isRequired,
  getEditingTermMeaning: PropTypes.func.isRequired,
  editTerm: PropTypes.func.isRequired,
  language: PropTypes.number.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  value: PropTypes.shape({ id: PropTypes.string })
};
