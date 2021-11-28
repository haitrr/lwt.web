import {Button, TextField} from "@material-ui/core";
import React from "react";
import {connect} from "react-redux";
import LanguageSelect from "../../Inputs/LanguageSelect/LanguageSelect";
import {RootState} from "../../../RootReducer";
import {Formik, Form, ErrorMessage, FormikProps} from 'formik';

interface StateProps {
  currentLanguage: string;
}

interface OwnProps {
  formRef: React.Ref<FormikProps<FormValues>> | undefined;
  onSubmit: (e: any) => void;
  onCancel: () => void;
  submitting: boolean;
}

export interface FormValues {
  languageCode: string;
  title: string;
  content: string;
}

type Props = OwnProps & StateProps;

const TextCreateForm: React.FC<Props> =
  ({
     currentLanguage,
     formRef,
     onSubmit,
     submitting,
     onCancel,
   }) => {
    return (
      <Formik
        initialValues={{
          languageCode: currentLanguage,
          title: "",
          content: ""
        }}
        onSubmit={onSubmit}
        innerRef={formRef}
      >
        {({handleChange, values}) => (
          <Form onSubmit={onSubmit}>
            <LanguageSelect name="languageCode" onChange={handleChange} value={values.languageCode}/>
            <ErrorMessage name="languageCode" component="div"/>
            <TextField
              variant="outlined"
              name="title"
              value={values.title}
              onChange={handleChange}
              label="Title"
              placeholder="Title"
              style={{width: "100%"}}
            />
            <TextField
              onChange={handleChange}
              variant="outlined"
              label="Content"
              name="content"
              value={values.content}
              multiline
              rows={10}
              rowsMax={20}
              style={{width: "100%"}}
              placeholder="Please input text content here ..."
            />
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
                type="submit"
                color="primary"
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };

export default connect<StateProps, void, OwnProps, RootState>((state) => ({
  currentLanguage: state.language.currentLanguage,
}))(TextCreateForm);
