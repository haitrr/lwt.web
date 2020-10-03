import { Form, Input } from "antd";
import React, { RefObject } from "react";
import { connect } from "react-redux";
import { FormInstance } from "antd/es/form";
import LanguageSelect from "../../Inputs/LanguageSelect/LanguageSelect";
import { RootState } from "../../../RootReducer";
import { TextEditDetail } from "../../../Reducers/TextReducer";

interface OwnProps {
  editDetail: TextEditDetail;
  formRef: RefObject<FormInstance>;
}

type TextEditFormProps = OwnProps;

/**
 * text create form
 */
function TextEditForm(props: TextEditFormProps) {
  const { editDetail, formRef } = props;

  return (
    <Form ref={formRef}>
      <Form.Item name="languageCode" initialValue={editDetail.languageCode}>
        {/* @ts-ignore */}
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
  (state: RootState) => ({
    currentLanguage: state.language.currentLanguage,
  }),
  {}
)(TextEditForm);
