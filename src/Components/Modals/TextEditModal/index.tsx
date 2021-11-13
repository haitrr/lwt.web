import {Modal, Paper} from "@material-ui/core";
import React from "react";
import {connect} from "react-redux";
import {FormInstance} from "antd/lib/form";
import TextEditForm from "../../Forms/TextEditForm";
import {
  editTextAction,
  getTextEditDetailAction,
} from "../../../Actions/TextAction";
import {selectEditDetail} from "../../../Selectors/TextSelector";
import {TextEditDetail} from "../../../Reducers/TextReducer";
import {RootState} from "../../../RootReducer";

interface OwnProps {
  hide: () => void;
  editingText: number;
  onEdit: () => void;
  visible: boolean;
}

interface DispatchProps {
  getEditDetail: (id: number) => void;
  editText: (id: number, values: any) => Promise<any>;
}

interface StateProps {
  editDetail: TextEditDetail | null;
}

type Props = OwnProps & StateProps & DispatchProps;

const TextEditModal: React.FC<Props> =
  ({
     visible,
     editDetail,
     hide,
     editingText,
     getEditDetail,
     editText,
     onEdit
   }) => {
    const [submitting, setSubmitting] = React.useState(false)
    if (!editDetail) {
      return null;
    }
    React.useEffect(() => {
      if (editingText) {
        getEditDetail(editingText);
      }
    }, [editingText])

    React.useEffect(() => {
      if (!editDetail) {
        hide();
      }
    }, [editDetail])

    const formRef = React.useRef<FormInstance>()

    const handleOk = () => {
      const form = formRef.current;
      setSubmitting(true)
      form?.validateFields().then((values) => {
        editText(editingText, values).then(() => {
          onEdit();
          setSubmitting(false)
          form.resetFields();
          hide();
        });
      });
    };

    const handleCancel = () => {
      const form = formRef.current;
      form?.resetFields();
      hide();
    };

    return (
      <Modal open={visible} title="Edit text">
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper style={{width: "90vw", padding: "1rem"}}>
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
  }

// @ts-ignore
export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  (state: RootState) => ({
    editDetail: selectEditDetail(state),
  }),
  {
    editText: editTextAction,
    getEditDetail: getTextEditDetailAction,
  }
)(TextEditModal);
