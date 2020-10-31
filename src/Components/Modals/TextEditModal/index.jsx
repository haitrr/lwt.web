import PropTypes from "prop-types";
import { Modal } from "antd";
import React from "react";
import { connect } from "react-redux";
import TextEditForm from "../../Forms/TextEditForm";
import {
  editTextAction,
  getTextEditDetailAction,
} from "../../../Actions/TextAction";
import { selectEditDetail } from "../../../Selectors/TextSelector";

/**
 * text create modal
 */
class TextEditModal extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidUpdate(prevProps) {
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
    form.validateFields().then((values) => {
      editText(editingText, values).then(onEdit);
      form.resetFields();
      hide();
    });
  }

  handleCancel() {
    const { hide } = this.props;
    const form = this.formRef.current;
    form.resetFields();
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
  (state) => ({
    editDetail: selectEditDetail(state),
  }),
  {
    editText: editTextAction,
    getEditDetail: getTextEditDetailAction,
  }
)(TextEditModal);

TextEditModal.defaultProps = {
  editingText: null,
  editDetail: null,
};

TextEditModal.propTypes = {
  editText: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  editDetail: PropTypes.shape({}),
  getEditDetail: PropTypes.func.isRequired,
  editingText: PropTypes.string,
};
