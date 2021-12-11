import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { TextItem } from "../../../Reducers/TextReducer";
import DeleteTextButton from "./DeleteTextButton";

export interface TextActionsProps {
  text: TextItem;
  onEdit: Function;
}

const TextActions: React.FC<TextActionsProps> = ({ onEdit, text: { id } }) => {
  return (
    <span>
      <DeleteTextButton textId={id} />
      <IconButton color="primary" onClick={() => onEdit(id)} size="large">
        <EditIcon />
      </IconButton>
    </span>
  );
};

export default TextActions;
