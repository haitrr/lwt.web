import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import React from "react";
import { connect } from "react-redux";
import { Paper, Typography } from "@material-ui/core";
import TextCreateForm from "../../Forms/TextCreateForm";
import { createTextAction, getTextsAction } from "../../../Actions/TextAction";

/**
 * text create modal
 */
const TextCreateModal = ({ createText, hide, onCreate, visible }) => {
  const formRef = React.useRef();

  const handleOk = () => {
    const form = formRef.current;
    form
      .validateFields()
      .then((values) => {
        createText(values).then(onCreate);
        form.resetFields();
        hide();
      })
      .catch(() => {});
  };

  const handleCancel = () => {
    const form = formRef.current;
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
  getTexts: getTextsAction,
})(TextCreateModal);

TextCreateModal.propTypes = {
  createText: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
};
