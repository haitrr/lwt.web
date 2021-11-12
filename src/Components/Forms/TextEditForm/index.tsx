import PropTypes from "prop-types";
import {Form} from "antd";
import {Button, TextField} from "@material-ui/core";
import React from "react";
import {connect} from "react-redux";
import LanguageSelect from "../../Inputs/LanguageSelect/LanguageSelect";
import {RootState} from "../../../RootReducer";

interface Props {
  editDetail: any
  formRef: any
  onSubmit: any
  onCancel: any
  submitting: boolean
}


/**
 * text create form
 */
const TextEditForm: React.FC<Props> = (props) => {
  const {editDetail, formRef, onSubmit, onCancel, submitting} = props;

  return (
    <Form ref={formRef}>
      <Form.Item name="languageCode" initialValue={editDetail.languageCode}>
        <LanguageSelect/>
      </Form.Item>
      <Form.Item name="title" initialValue={editDetail.title}>
        <TextField
          variant="outlined"
          label="Title"
          style={{width: "100%", marginTop: "1rem"}}
          placeholder="Title"
        />
      </Form.Item>
      <Form.Item name="content" initialValue={editDetail.content}>
        <TextField
          style={{width: "100%", marginTop: "1rem"}}
          variant="outlined"
          label="Content"
          multiline
          rowsMax={20}
          rows={10}
          placeholder="Please input text content here ..."
        />
      </Form.Item>
      <hr/>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button
          disabled={submitting}
          variant="contained"
          color="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          disabled={submitting}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default connect(
  (state: RootState) => ({
    currentLanguage: state.language.currentLanguage,
  }),
  null
)(TextEditForm);
