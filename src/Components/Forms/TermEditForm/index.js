import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
import LearningLevelSelect from "../../Inputs/LearningLevelSelect";
import LanguageSelect from "../../Inputs/LanguageSelect";
import {
  createTermAction,
  editTermAction,
  setEditingTermAction
} from "../../../Actions/TermAction";

class TermEditForm extends React.Component {
  handleSubmit = e => {
    const {
      form: { getFieldsValue },
      value,
      createTerm,
      editTerm
    } = this.props;
    e.preventDefault();
    const editedData = getFieldsValue();
    const editedTerm = { ...value, ...editedData };
    if (!value.id) {
      createTerm(editedTerm);
    } else {
      editTerm(editedTerm);
    }
  };
  render() {
    const {
      form: { getFieldDecorator },
      value,
      language
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="vertical">
        <Form.Item label="Content">
          {getFieldDecorator("content", { initialValue: value.content })(
            <Input disabled />
          )}
        </Form.Item>
        <Form.Item label="Language">
          {getFieldDecorator("language", { initialValue: language })(
            <LanguageSelect disabled={true} />
          )}
        </Form.Item>
        <Form.Item label="Meaning">
          {getFieldDecorator("meaning", { initialValue: value.meaning })(
            <Input.TextArea placeholder="Meaning" />
          )}
        </Form.Item>
        <Form.Item label="Learning Level">
          {getFieldDecorator("learningLevel", {
            initialValue: value.learningLevel
          })(<LearningLevelSelect />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(
  state => {
    return {
      value: state.term.editingTerm,
      language: state.text.readingText.language
    };
  },
  {
    setEditingTerm: setEditingTermAction,
    createTerm: createTermAction,
    editTerm: editTermAction
  }
)(Form.create()(TermEditForm));
