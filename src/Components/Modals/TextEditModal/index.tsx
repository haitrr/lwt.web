import { Modal, Paper } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { FormInstance } from "antd/lib/form";
import TextEditForm from "../../Forms/TextEditForm";
import {
  editTextAction,
  getTextEditDetailAction,
} from "../../../Actions/TextAction";
import { selectEditDetail } from "../../../Selectors/TextSelector";
import { TextEditDetail } from "../../../Reducers/TextReducer";
import { RootState } from "../../../RootReducer";

interface OwnProps {
  hide: () => void;
  editingText: number;
  onEdit: () => void;
  visible: boolean;
}

interface DispatchProps {
  getEditDetail: (id: number) => void;
  editText: (id: number, values: any) => Promise<any>;
}

interface StateProps {
  editDetail: TextEditDetail | null;
}

interface State {
  submitting: boolean;
}

type Props = OwnProps & StateProps & DispatchProps;

/**
 * text create modal
 */
class TextEditModal extends React.Component<Props, State> {
  formRef = React.createRef<FormInstance>();

  constructor(props: Props) {
    super(props);
    this.state = { submitting: false };
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
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

  handleOk = () => {
    const form = this.formRef.current;
    const { editText, hide, editingText, onEdit } = this.props;
    this.setState({ submitting: true });
    form?.validateFields().then((values) => {
      editText(editingText, values).then(() => {
        onEdit();
        this.setState({ submitting: false });
        form.resetFields();
        hide();
      });
    });
  };

  handleCancel = () => {
    const { hide } = this.props;
    const form = this.formRef.current;
    form?.resetFields();
    hide();
  };

  render() {
    const { visible, editDetail } = this.props;
    if (!editDetail) {
      return null;
    }
    return (
      <Modal open={visible} title="Edit text">
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper style={{ width: "70vw", padding: "1rem" }}>
            <TextEditForm
              onSubmit={this.handleOk}
              onCancel={this.handleCancel}
              editDetail={editDetail}
              formRef={this.formRef}
              submitting={this.state.submitting}
            />
          </Paper>
        </div>
      </Modal>
    );
  }
}

// @ts-ignore
export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  (state: RootState) => ({
    editDetail: selectEditDetail(state),
  }),
  {
    editText: editTextAction,
    getEditDetail: getTextEditDetailAction,
  }
)(TextEditModal);
