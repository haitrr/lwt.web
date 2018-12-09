import { Modal } from "antd";
import React from "react";
import { connect } from "react-redux";
import { TextCreateForm } from "../../Forms/TextCreateForm";
import { createTextAction } from "../../../Actions/TextAction";


/**
 * text create modal
 */
class TextCreateModal extends React.Component{
  formRef= null;
  constructor(props) {
    super(props);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleOk(){
    const { form } = this.formRef.props;
    const { createText, hide } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      createText(values);
      form.resetFields();
      hide();
    });
  }

  handleCancel(){
    const { hide } = this.props;
    const { form } = this.formRef.props;
    form.resetFields();
    hide();
  }

  saveFormRef(formRef){
    this.formRef = formRef;
  }

  render(){
    const { visible } = this.props;

    return (
      <Modal
        visible={visible}
        title="Add new text"
        okText="Add"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <TextCreateForm wrappedComponentRef={this.saveFormRef} />
      </Modal>
    );
  }
}

const connectedTextCreateModal = connect(
  null,
  {
    createText: createTextAction
  }
)(TextCreateModal);

export { connectedTextCreateModal as TextCreateModal };
