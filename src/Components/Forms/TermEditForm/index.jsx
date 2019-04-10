import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Col, notification, Row } from "antd";
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
import { selectEditingTermValue } from "../../../Selectors/TermSelectors";

class TermEditForm extends React.Component {
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
      className
    } = this.props;

    if (!value) {
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
              {getFieldDecorator("meaning", { initialValue: value.meaning })(
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

export default connect(
  state => ({
    value: selectEditingTermValue(state),
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
  value: null,
  className: ""
};

TermEditForm.propTypes = {
  form: PropTypes.shape({}).isRequired,
  createTerm: PropTypes.func.isRequired,
  setEditingTerm: PropTypes.func.isRequired,
  editTerm: PropTypes.func.isRequired,
  language: PropTypes.number.isRequired,
  value: PropTypes.shape({ id: PropTypes.string }),
  className: PropTypes.string
};
