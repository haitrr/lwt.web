import PropTypes from "prop-types";
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

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

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
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="Content">
          {getFieldDecorator("content", { initialValue: value.content })(
            <Input disabled />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Language">
          {getFieldDecorator("language", { initialValue: language })(
            <LanguageSelect disabled />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Meaning">
          {getFieldDecorator("meaning", { initialValue: value.meaning })(
            <Input.TextArea placeholder="Meaning" />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Learning Level">
          {getFieldDecorator("learningLevel", {
            initialValue: value.learningLevel
          })(<LearningLevelSelect />)}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 }
          }}
        >
          <Button type="primary" htmlType="submit">
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
    language: state.text.readingText.language
  }),
  {
    setEditingTerm: setEditingTermAction,
    createTerm: createTermAction,
    editTerm: editTermAction
  }
)(Form.create()(TermEditForm));

TermEditForm.propTypes = {
  form: PropTypes.shape({}).isRequired,
  createTerm: PropTypes.func.isRequired,
  editTerm: PropTypes.func.isRequired,
  language: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
};
