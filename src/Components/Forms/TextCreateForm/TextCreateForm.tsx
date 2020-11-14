import { Form } from "antd";
import { Button, TextField } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { FormInstance } from "antd/es/form";
import LanguageSelect from "../../Inputs/LanguageSelect/LanguageSelect";
import { RootState } from "../../../RootReducer";

interface StateProps {
  currentLanguage: string;
}

interface OwnProps {
  formRef: React.MutableRefObject<FormInstance | null>;
  onSubmit: () => void;
  onCancel: () => void;
  submitting: boolean;
}

type Props = OwnProps & StateProps;

/**
 * text create form
 */
const TextCreateForm: React.FC<Props> = ({
  currentLanguage,
  formRef,
  onSubmit,
  submitting,
  onCancel,
}) => {
  return (
    <Form ref={formRef}>
      <Form.Item name="languageCode" initialValue={currentLanguage}>
        <LanguageSelect />
      </Form.Item>
      <Form.Item name="title">
        <TextField placeholder="Title" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name="content">
        <TextField
          multiline
          rows={10}
          rowsMax={20}
          style={{ width: "100%" }}
          placeholder="Please input text content here ..."
        />
      </Form.Item>
      <div
        style={{
          display: "flex",
          margin: "1rem 0 0 0",
          justifyContent: "space-between",
        }}
      >
        <Button
          disabled={submitting}
          onClick={onCancel}
          color="secondary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          disabled={submitting}
          onClick={onSubmit}
          color="primary"
          variant="contained"
        >
          Add
        </Button>
      </div>
    </Form>
  );
};

export default connect<StateProps, void, OwnProps, RootState>((state) => ({
  currentLanguage: state.language.currentLanguage,
}))(TextCreateForm);
