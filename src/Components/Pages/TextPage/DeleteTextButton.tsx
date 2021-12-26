import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';
import { TextItem } from '../../../Reducers/TextReducer';
import { useMutation } from 'react-query';
import { deleteTextAsync } from '../../../Apis/TextApi';

interface OwnProps {
  text: TextItem;
  onDelete: () => void;
}

type Props = OwnProps;

const DeleteTextButton: React.FC<Props> = ({ text, onDelete }) => {
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const { mutate: deleteText, isLoading: deleting } = useMutation(
    (id: number) => {
      return deleteTextAsync(id);
    },
    { onSettled: handleClose, onSuccess: onDelete },
  );

  const handleConfirm = () => {
    deleteText(text.id);
  };

  return (
    <div>
      <IconButton color="secondary" onClick={handleClickOpen} size="large">
        <DeleteForeverIcon />
      </IconButton>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Are you sure to delete this text forever ?</DialogTitle>
        <DialogContent>
          <DialogContentText>{text.title}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus disabled={deleting} onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" disabled={deleting} onClick={handleConfirm} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteTextButton;
