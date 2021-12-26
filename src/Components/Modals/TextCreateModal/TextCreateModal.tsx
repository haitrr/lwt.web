import Modal from '@mui/material/Modal';
import React from 'react';
import { Paper, Typography } from '@mui/material';
import TextCreateForm, { FormValues } from '../../Forms/TextCreateForm/TextCreateForm';
import { FormikProps } from 'formik';
import { useMutation } from 'react-query';
import { createTextAsync, TextCreateModel } from '../../../Apis/TextApi';

interface StateProps {}

interface OwnProps {
  hide: () => void;
  onCreate: () => void;
  visible: boolean;
}

type Props = StateProps & OwnProps;

/**
 * text create modal
 */
const TextCreateModal: React.FC<Props> = ({ hide, onCreate, visible }) => {
  const formRef = React.useRef<FormikProps<FormValues>>(null);
  const { mutate: createText, isLoading: submitting } = useMutation(
    (text: TextCreateModel) => {
      return createTextAsync(text);
    },
    {
      onSuccess: onCreate,
      onSettled: () => {
        const form = formRef.current;
        if (!form) throw new Error();
        form.resetForm();
        hide();
      },
    },
  );

  const handleOk = (e: any) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) throw new Error();
    form.validateForm(form.values).then((errors) => {
      if (Object.keys(errors).length === 0) {
        createText(form.values);
      }
    });
  };

  const handleCancel = () => {
    const form = formRef.current;
    if (!form) throw new Error();
    form.resetForm();
    hide();
  };

  return (
    <Modal open={visible}>
      <div
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper style={{ padding: '1rem', width: '90vw' }}>
          <Typography style={{ textAlign: 'center' }}>Add new text</Typography>
          <TextCreateForm onSubmit={handleOk} submitting={submitting} onCancel={handleCancel} formRef={formRef} />
        </Paper>
      </div>
    </Modal>
  );
};

export default TextCreateModal;
