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
class TextCreateModal extends React.Component {
  formRef = React.createRef();

  handleOk = () => {
    const form = this.formRef.current;
    const { createText, hide, onCreate } = this.props;
    form
      .validateFields()
      .then((values) => {
        createText(values).then(onCreate);
        form.resetFields();
        hide();
      })
      .catch(() => {});
  };

  handleCancel = () => {
    const form = this.formRef.current;
    const { hide } = this.props;
    form.resetFields();
    hide();
  };

  render() {
    const { visible } = this.props;

    return (
      <Modal open={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper style={{ padding: "1rem", width: "90vw" }}>
            <Typography style={{ textAlign: "center" }}>
              Add new text
            </Typography>
            <TextCreateForm
              onSubmit={this.handleOk}
              onCancel={this.handleCancel}
              formRef={this.formRef}
            />
          </Paper>
        </div>
      </Modal>
    );
  }
}

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
