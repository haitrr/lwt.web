import PropTypes from "prop-types";
import { Form, Input } from "antd";
import React from "react";
import { connect } from "react-redux";
import LanguageSelect from "../../Inputs/LanguageSelect/LanguageSelect";

/**
 * text create form
 */
function TextCreateForm(props) {
  const { currentLanguage, formRef } = props;

  return (
    <Form ref={formRef}>
      <Form.Item name="languageCode" intialValue={currentLanguage}>
        <LanguageSelect />
      </Form.Item>
      <Form.Item name="title">
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item name="content">
        <Input.TextArea
          autosize={{ minRows: 10, maxRows: 20 }}
          placeholder="Please input text content here ..."
        />
      </Form.Item>
    </Form>
  );
}

export default connect(
  state => ({
    currentLanguage: state.language.currentLanguage
  }),
  null
)(TextCreateForm);

TextCreateForm.propTypes = {
  currentLanguage: PropTypes.number.isRequired,
  form: PropTypes.shape({}).isRequired
};
