import { FormProps } from "antd/lib/form/Form";
import { Modal } from "antd";
import React from "react";
import { connect } from "react-redux";
import { FormInstance } from "antd/es/form";
import TextCreateForm from "../../Forms/TextCreateForm";
import { createTextAction, getTextsAction } from "../../../Actions/TextAction";

interface TextCreateModalProps {
  createText: Function;
  hide: () => void;
  visible: boolean;
  onCreate: Function;
}

/**
 * text create modal
 */
class TextCreateModal extends React.Component<
  TextCreateModalProps & FormProps
> {
  formRef = React.createRef<FormInstance>();

  constructor(props: TextCreateModalProps) {
    super(props);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleOk() {
    const form = this.formRef.current;
    if (!form) throw new Error();
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
    if (!form) throw new Error();
    const { hide } = this.props;
    form.resetFields();
    hide();
  }

  saveFormRef(formRef: React.RefObject<FormInstance>) {
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
