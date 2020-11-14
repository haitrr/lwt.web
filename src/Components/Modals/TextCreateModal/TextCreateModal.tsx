import Modal from "@material-ui/core/Modal";
import React from "react";
import { connect } from "react-redux";
import { Paper, Typography } from "@material-ui/core";
import { FormInstance } from "antd/es/form";
import TextCreateForm from "../../Forms/TextCreateForm";
import { createTextAction } from "../../../Actions/TextAction";

interface StateProps {
  createText: (values: any) => any;
}

interface OwnProps {
  hide: () => void;
  onCreate: () => void;
  visible: boolean;
}

type Props = StateProps & OwnProps;

/**
 * text create modal
 */
const TextCreateModal: React.FC<Props> = ({
  createText,
  hide,
  onCreate,
  visible,
}) => {
  const formRef = React.useRef<FormInstance>(null);
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const handleOk = () => {
    const form = formRef.current;
    if (!form) throw new Error();
    form
      .validateFields()
      .then((values) => {
        setSubmitting(true);
        createText(values).then(() => {
          onCreate();
          setSubmitting(false);
          form.resetFields();
          hide();
        });
      })
      .catch(() => {});
  };

  const handleCancel = () => {
    const form = formRef.current;
    if (!form) throw new Error();
    form.resetFields();
    hide();
  };

  return (
    <Modal open={visible}>
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper style={{ padding: "1rem", width: "90vw" }}>
          <Typography style={{ textAlign: "center" }}>Add new text</Typography>
          <TextCreateForm
            onSubmit={handleOk}
            submitting={submitting}
            onCancel={handleCancel}
            formRef={formRef}
          />
        </Paper>
      </div>
    </Modal>
  );
};

export default connect(null, {
  createText: createTextAction,
})(TextCreateModal);
