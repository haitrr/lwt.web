import { Modal, Paper } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import TextEditForm, { FormValues } from '../../Forms/TextEditForm';
import { editTextAction, getTextEditDetailAction } from '../../../Actions/TextAction';
import { selectEditDetail } from '../../../Selectors/TextSelector';
import { TextEditDetail } from '../../../Reducers/TextReducer';
import { RootState } from '../../../RootReducer';
import { FormikProps } from 'formik';

interface OwnProps {
  hide: () => void;
  editingText: number | null;
  onEdit: () => void;
  visible: boolean;
}

interface DispatchProps {
  getEditDetail: (id: number) => void;
  editText: (id: number, values: any) => Promise<any>;
}

interface StateProps {
  editDetail?: TextEditDetail;
}

type Props = OwnProps & StateProps & DispatchProps;

const TextEditModal: React.FC<Props> = ({
  visible,
  editDetail,
  hide,
  editingText,
  getEditDetail,
  editText,
  onEdit,
}) => {
  const [submitting, setSubmitting] = React.useState(false);
  React.useEffect(() => {
    if (editingText) {
      getEditDetail(editingText);
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
        editText(editingText!, form?.values).then(() => {
          onEdit();
          setSubmitting(false);
          form?.resetForm();
          hide();
        });
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

// @ts-ignore
export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  (state: RootState) => ({
    editDetail: selectEditDetail(state),
  }),
  {
    editText: editTextAction,
    getEditDetail: getTextEditDetailAction,
  },
)(TextEditModal);
