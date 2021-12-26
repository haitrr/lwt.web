import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TextItem } from '../../../Reducers/TextReducer';
import DeleteTextButton from './DeleteTextButton';

export interface TextActionsProps {
  text: TextItem;
  onEdit: Function;
  onDelete: () => void;
}

const TextActions: React.FC<TextActionsProps> = ({ onEdit, text, onDelete }) => {
  return (
    <span>
      <DeleteTextButton text={text} onDelete={onDelete} />
      <IconButton color="primary" onClick={() => onEdit(text.id)} size="large">
        <EditIcon />
      </IconButton>
    </span>
  );
};

export default TextActions;
