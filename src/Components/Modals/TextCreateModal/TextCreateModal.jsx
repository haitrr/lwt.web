import PropTypes from "prop-types";
import { Modal } from "antd";
import React from "react";
import { connect } from "react-redux";
import TextCreateForm from "../../Forms/TextCreateForm";
import { createTextAction, getTextsAction } from "../../../Actions/TextAction";

/**
 * text create modal
 */
class TextCreateModal extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleOk() {
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
  }

  handleCancel() {
    const form = this.formRef.current;
    const { hide } = this.props;
    form.resetFields();
    hide();
  }

  saveFormRef(formRef) {
    this.formRef = formRef;
  }

  render() {
    const { visible } = this.props;

    return (
      <Modal
        visible={visible}
        title="Add new text"
        okText="Add"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <TextCreateForm formRef={this.formRef} />
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
