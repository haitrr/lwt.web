import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../RootReducer";
import { TextItem } from "../../../Reducers/TextReducer";
import { deleteTextAction } from "../../../Actions/TextAction";

interface DispatchProps {
  deleteText: (id: number) => any;
}

interface OwnProps {
  textId: number;
}

interface StateProps {
  text: TextItem;
}

type Props = StateProps & DispatchProps & OwnProps;

const DeleteTextButton: React.FC<Props> = ({ text, deleteText }) => {
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [deleting, setDeleting] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    setDeleting(true);
    deleteText(text.id).then(() => {
      setDeleting(false);
      handleClose();
    });
  };

  return (
    <div>
      <IconButton size="small" color="secondary" onClick={handleClickOpen}>
        <DeleteForeverIcon />
      </IconButton>
      <Dialog
        disableBackdropClick={deleting}
        open={dialogOpen}
        onClose={handleClose}
      >
        <DialogTitle>Are you sure to delete this text forever ?</DialogTitle>
        <DialogContent>
          <DialogContentText>{text.title}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            disabled={deleting}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={deleting}
            onClick={handleConfirm}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  (state, ownProps) => {
    const text = state.text.texts.find((t) => t.id === ownProps.textId);
    if (!text) throw new Error();
    return {
      text,
    };
  },
  { deleteText: deleteTextAction }
)(DeleteTextButton);
