import PropTypes from "prop-types";
import { Form, Input } from "antd";
import React from "react";
import { connect } from "react-redux";
import LanguageSelect from "../../Inputs/LanguageSelect/LanguageSelect";

/**
 * text create form
 */
function TextEditForm(props) {
  const { editDetail, formRef } = props;

  return (
    <Form ref={formRef}>
      <Form.Item name="languageCode" initialValue={editDetail.languageCode}>
        <LanguageSelect />
      </Form.Item>
      <Form.Item name="title" initialValue={editDetail.title}>
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item name="content" initialValue={editDetail.content}>
        <Input.TextArea
          autoSize={{ minRows: 10, maxRows: 20 }}
          placeholder="Please input text content here ..."
        />
      </Form.Item>
    </Form>
  );
}

export default connect(
  (state) => ({
    currentLanguage: state.language.currentLanguage,
  }),
  null
)(TextEditForm);

TextEditForm.propTypes = {
  editDetail: PropTypes.shape({}).isRequired,
  formRef: PropTypes.shape({}).isRequired,
};
