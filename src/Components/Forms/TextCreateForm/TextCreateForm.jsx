import PropTypes from "prop-types";
import { Form, Input } from "antd";
import React from "react";
import { connect } from "react-redux";
import LanguageSelect from "../../Inputs/LanguageSelect/LanguageSelect";

/**
 * text create form
 */
function TextCreateForm(props) {
  const {
    form: { getFieldDecorator },
    currentLanguage
  } = props;

  return (
    <Form>
      <Form.Item>
        {getFieldDecorator("languageCode", { initialValue: currentLanguage })(
          <LanguageSelect />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("title")(<Input placeholder="Title" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("content")(
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
  )(TextCreateForm)
);

TextCreateForm.propTypes = {
  currentLanguage: PropTypes.number.isRequired,
  form: PropTypes.shape({}).isRequired
};
