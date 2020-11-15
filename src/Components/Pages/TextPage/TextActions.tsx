import React from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
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
      <IconButton size="small" color="primary" onClick={() => onEdit(id)}>
        <EditIcon />
      </IconButton>
    </span>
  );
};

export default TextActions;
