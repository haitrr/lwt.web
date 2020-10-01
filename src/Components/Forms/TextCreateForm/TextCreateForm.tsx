import { Form, Input } from "antd";
import React from "react";
import { connect } from "react-redux";
import { FormInstance } from "antd/es/form";
import LanguageSelect from "../../Inputs/LanguageSelect/LanguageSelect";
import { RootState } from "../../../RootReducer";

interface TextCreateFormProps {
  formRef: React.RefObject<FormInstance>;
}

interface ConnectedProps {
  currentLanguage: string;
}

type ComponentProps = TextCreateFormProps & ConnectedProps;

/**
 * text create form
 */
class TextCreateForm extends React.Component<ComponentProps> {
  render() {
    const { currentLanguage, formRef } = this.props;

    return (
      <Form ref={formRef}>
        <Form.Item name="languageCode" initialValue={currentLanguage}>
          <LanguageSelect />
        </Form.Item>
        <Form.Item name="title">
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="content">
          <Input.TextArea
            autoSize={{ minRows: 10, maxRows: 20 }}
            placeholder="Please input text content here ..."
          />
        </Form.Item>
      </Form>
    );
  }
}

export default connect<ConnectedProps, {}, TextCreateFormProps, RootState>(
  (state: RootState): ConnectedProps => ({
    currentLanguage: state.language.currentLanguage,
  }),
  {}
)(TextCreateForm);
