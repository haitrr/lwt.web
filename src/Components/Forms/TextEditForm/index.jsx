import PropTypes from "prop-types";
import { Form, Input } from "antd";
import React from "react";
import { connect } from "react-redux";
import { LanguageSelect } from "../../Inputs/LanguageSelect/LanguageSelect";

/**
 * text create form
 */
function TextEditForm(props) {
  const {
    form: { getFieldDecorator },
    editDetail
  } = props;

  return (
    <Form>
      <Form.Item>
        {getFieldDecorator("language", { initialValue: editDetail.language })(
          <LanguageSelect />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("title", { initialValue: editDetail.title })(
          <Input placeholder="Title" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("content", { initialValue: editDetail.content })(
          <Input.TextArea
            autosize={{ minRows: 10, maxRows: 20 }}
            placeholder="Please input text content here ..."
          />
        )}
      </Form.Item>
    </Form>
  );
}

export default Form.create()(
  connect(
    state => ({
      currentLanguage: state.language.currentLanguage
    }),
    null
  )(TextEditForm)
);

TextEditForm.propTypes = {
  editDetail: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired
  }).isRequired
};
