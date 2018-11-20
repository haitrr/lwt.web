import { Modal } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { TextCreateForm } from "src/Components/Forms/TextCreateForm";
import { createTextAction } from "../../../Actions/TextAction";

interface ITextCreateModalProps {
  visible: boolean;
  createText(data: any): void;
  hide(): void;
}
/**
 * text create modal
 */
class TextCreateModal extends React.Component<ITextCreateModalProps> {
  public formRef: any = null;
  constructor(props: ITextCreateModalProps) {
    super(props);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  public handleOk(): void {
    const { form } = this.formRef.props;
    const { createText, hide } = this.props;
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      createText(values);
      form.resetFields();
      hide();
    });
  }

  public handleCancel(): void {
    const { hide } = this.props;
    const { form } = this.formRef.props;
    form.resetFields();
    hide();
  }

  public saveFormRef(formRef: any): void {
    this.formRef = formRef;
  }

  public render(): React.ReactNode {
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

const connectedTextCreateModal: any = connect(
  null,
  {
    createText: createTextAction
  }
)(TextCreateModal);

export { connectedTextCreateModal as TextCreateModal };
