import { Modal, Paper } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextEditForm, { FormValues } from '../../Forms/TextEditForm';
import { editTextAction, getTextEditDetailAction } from '../../../Actions/TextAction';
import { selectEditDetail } from '../../../Selectors/TextSelector';
import { RootState } from '../../../RootReducer';
import { FormikProps } from 'formik';

interface OwnProps {
  hide: () => void;
  editingText: number | null;
  onEdit: () => void;
  visible: boolean;
}

type Props = OwnProps;

const TextEditModal: React.FC<Props> = ({ visible, hide, editingText, onEdit }) => {
  const editDetail = useSelector((state: RootState) => selectEditDetail(state));
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = React.useState(false);
  React.useEffect(() => {
    if (editingText) {
      dispatch(getTextEditDetailAction(editingText));
    }
  }, [editingText]); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (!editDetail) {
      hide();
    }
  }, [editDetail]); // eslint-disable-line react-hooks/exhaustive-deps
  const formRef = React.useRef<FormikProps<FormValues>>(null);

  if (!editDetail) {
    return null;
  }

  const handleOk = () => {
    const form = formRef.current;
    setSubmitting(true);
    form?.validateForm(form?.values).then((errors) => {
      if (Object.keys(errors).length === 0) {
        dispatch(editTextAction(editingText!, form!.values));
        onEdit();
        setSubmitting(false);
        form?.resetForm();
        hide();
      }
    });
  };

  const handleCancel = () => {
    const form = formRef.current;
    form?.resetForm();
    hide();
  };

  return (
    <Modal open={visible} title="Edit text">
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper style={{ width: '90vw', padding: '1rem' }}>
          <TextEditForm
            onSubmit={handleOk}
            onCancel={handleCancel}
            editDetail={editDetail}
            formRef={formRef}
            submitting={submitting}
          />
        </Paper>
      </div>
    </Modal>
  );
};

export default TextEditModal;
