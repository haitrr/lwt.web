import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Button, Col, Form, Input, notification, Row } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Pluralize from "pluralize";
import LearningLevelSelect from "../../Inputs/LearningLevelSelect";
import LanguageSelect from "../../Inputs/LanguageSelect";
import styles from "./TermEditForm.module.scss";
import {
  createTermAction,
  editTermAction,
  getEditingTermMeaningAction,
  setEditingTermAction
} from "../../../Actions/TermAction";
import {
  selectEditingTermMeaning,
  selectEditingTermValue
} from "../../../Selectors/TermSelectors";
import { selectDictionaryLanguage } from "../../../Selectors/UserSelectors";

class TermEditForm extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      value,
      getEditingTermMeaning,
      editingTermMeaning,
      dictionaryLanguage,
      languages,
      language
    } = this.props;
    if (
      value.content &&
      !value.meaning &&
      editingTermMeaning === prevProps.editingTermMeaning &&
      (!prevProps.value || prevProps.value.content !== value.content)
    ) {
      const { code } = languages.find(l => l.id === language);
      getEditingTermMeaning(
        // this library seem to only work with English
        Pluralize.singular(value.content),
        code,
        dictionaryLanguage
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
      language,
      className,
      editingTermMeaning,
      editingTerm
    } = this.props;
    if (!editingTerm) {
      return null;
    }
    return (
      <Form
        onSubmit={this.handleSubmit}
        layout="inline"
        className={`${className} ${styles.form}`}
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
        <Form.Item className={styles.language}>
          {getFieldDecorator("language", { initialValue: language })(
            <LanguageSelect disabled />
          )}
        </Form.Item>

        <Row>
          <Col xl={10} lg={12} xs={24}>
            <Form.Item className={styles.meaning}>
              {getFieldDecorator("meaning", {
                initialValue: value.meaning ? value.meaning : editingTermMeaning
              })(
                <Input.TextArea
                  autosize={{ maxRows: 3, minRows: 2 }}
                  placeholder="Meaning"
                  cols={60}
                />
              )}
            </Form.Item>
          </Col>
          <Col xl={10} lg={12} xs={24}>
            <Form.Item className={styles.learningLevel}>
              {getFieldDecorator("learningLevel", {
                initialValue: value.learningLevel
              })(<LearningLevelSelect />)}
            </Form.Item>
          </Col>
          <Col xl={4} lg={24} xs={24}>
            <Form.Item className={styles.saveButton}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.saveButton}
              >
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

TermEditForm.defaultProps = {
  className: "",
  value: null,
  dictionaryLanguage: null
};

TermEditForm.propTypes = {
  className: PropTypes.string,
  createTerm: PropTypes.func.isRequired,
  dictionaryLanguage: PropTypes.string,
  editTerm: PropTypes.func.isRequired,
  editingTerm: PropTypes.number.isRequired,
  editingTermMeaning: PropTypes.string.isRequired,
  form: PropTypes.shape().isRequired,
  getEditingTermMeaning: PropTypes.func.isRequired,
  language: PropTypes.number.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setEditingTerm: PropTypes.func.isRequired,
  value: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string
  })
};
export default connect(
  state => ({
    value: { ...selectEditingTermValue(state) },
    dictionaryLanguage: selectDictionaryLanguage(
      state,
      state.text.readingText.language
    ),
    editingTerm: state.term.editingTerm,
    language: state.text.readingText.language,
    languages: state.language.languages,
    editingTermMeaning: selectEditingTermMeaning(state)
  }),
  {
    setEditingTerm: setEditingTermAction,
    createTerm: createTermAction,
    editTerm: editTermAction,
    getEditingTermMeaning: getEditingTermMeaningAction
  }
)(Form.create()(TermEditForm));
