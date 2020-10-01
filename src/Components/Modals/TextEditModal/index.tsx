import { Modal } from "antd";
import React from "react";
import { connect } from "react-redux";
import { FormInstance } from "antd/es/form";
import TextEditForm from "../../Forms/TextEditForm";
import {
  editTextActionCreator,
  getTextEditDetailAction,
} from "../../../Actions/TextAction";
import {
  selectEditDetail,
  TextEditDetail,
} from "../../../Reducers/TextReducer";
import { RootState } from "../../../RootReducer";
import { TextEditModel } from "../../../Apis/TextApi";

interface OwnProps {
  hide: () => void;
  editingText: number;
  getEditDetail: (id: number) => void;
  editDetail: TextEditDetail;
  editText: (id: number, data: TextEditModel) => Promise<void>;
  onEdit: () => void;
  visible: boolean;
}

type TextEditModalProps = OwnProps;

/**
 * text create modal
 */
class TextEditModal extends React.Component<TextEditModalProps> {
  formRef = React.createRef<FormInstance>();

  constructor(props: TextEditModalProps) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidUpdate(prevProps: TextEditModalProps) {
    const { hide, editingText, getEditDetail, editDetail } = this.props;
    if (prevProps.editingText !== editingText && editingText) {
      getEditDetail(editingText);
    }
    if (prevProps.editDetail !== editDetail) {
      if (!editDetail) {
        hide();
      }
    }
  }

  handleOk() {
    const form = this.formRef.current;
    const { editText, hide, editingText, onEdit } = this.props;
    form!.validateFields().then((values) => {
      editText(editingText, values).then(onEdit);
      form!.resetFields();
      hide();
    });
  }

  handleCancel() {
    const { hide } = this.props;
    const form = this.formRef.current;
    form!.resetFields();
    hide();
  }

  render() {
    const { visible, editDetail } = this.props;
    if (!editDetail) {
      return null;
    }
    return (
      <Modal
        visible={visible}
        title="Edit text"
        okText="Save"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <TextEditForm editDetail={editDetail} formRef={this.formRef} />
      </Modal>
    );
  }
}

export default connect(
  (state: RootState) => ({
    editDetail: selectEditDetail(state),
  }),
  {
    editText: editTextActionCreator,
    getEditDetail: getTextEditDetailAction,
  }
)(TextEditModal);
