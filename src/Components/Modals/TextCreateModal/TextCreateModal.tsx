import Modal from "@material-ui/core/Modal";
import React from "react";
import {connect} from "react-redux";
import {Paper, Typography} from "@material-ui/core";
import {createTextAction} from "../../../Actions/TextAction";
import TextCreateForm, {FormValues} from "../../Forms/TextCreateForm/TextCreateForm";
import {FormikProps} from "formik";

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
const TextCreateModal: React.FC<Props> =
  ({
     createText,
     hide,
     onCreate,
     visible,
   }) => {
    const formRef = React.useRef<FormikProps<FormValues>>(null);
    const [submitting, setSubmitting] = React.useState<boolean>(false);

    const handleOk = () => {
      console.log("submitting")
      const form = formRef.current;
      if (!form) throw new Error();
      console.log(form.values)
      form.validateForm(form.values).then(errors => {
        console.log(errors)
        if (Object.keys(errors).length === 0) {
          console.log("creating")
          setSubmitting(true);
          createText(form.values).then(() => {
            console.log("done")
            onCreate();
            setSubmitting(false);
            form.resetForm()
            hide();
          });
        }
      })
    }

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
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper style={{padding: "1rem", width: "90vw"}}>
            <Typography style={{textAlign: "center"}}>Add new text</Typography>
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
