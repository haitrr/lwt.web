import { Form, Formik, FormikProps } from 'formik';
import { Button, TextField } from '@mui/material';
import React from 'react';
import LanguageSelect from '../../Inputs/LanguageSelect/LanguageSelect';

interface Props {
  editDetail: any;
  formRef?: React.Ref<FormikProps<FormValues>> | undefined;
  onSubmit: any;
  onCancel: any;
  submitting: boolean;
}

export interface FormValues {
  title: string;
  languageCode: string;
  content: string;
}

/**
 * text create form
 */
const TextEditForm: React.FC<Props> = (props) => {
  const { editDetail, formRef, onSubmit, onCancel, submitting } = props;

  return (
    <Formik
      onSubmit={onSubmit}
      innerRef={formRef}
      initialValues={{
        title: editDetail.title,
        languageCode: editDetail.languageCode,
        content: editDetail.content,
      }}
    >
      {({ values, handleChange }) => {
        return (
          <Form>
            <LanguageSelect value={values.languageCode} name="languageCode" onChange={handleChange} />
            <TextField
              name="title"
              variant="outlined"
              onChange={handleChange}
              value={values.title}
              label="Title"
              style={{ width: '100%', marginTop: '1rem' }}
              placeholder="Title"
            />
            <TextField
              style={{ width: '100%', marginTop: '1rem' }}
              name="content"
              value={values.content}
              onChange={handleChange}
              variant="outlined"
              label="Content"
              multiline
              maxRows={20}
              minRows={10}
              placeholder="Please input text content here ..."
            />
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button disabled={submitting} variant="contained" color="secondary" onClick={onCancel}>
                Cancel
              </Button>
              <Button disabled={submitting} variant="contained" color="primary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TextEditForm;
