import React from "react";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import EditIcon from "@material-ui/icons/Edit";
import { TextItem } from "../../../Reducers/TextReducer";
import DeleteTextButton from "./DeleteTextButton";

export interface TextActionsProps {
  text: TextItem;
  onEdit: Function;
}

const TextActions: React.FC<TextActionsProps> = ({
  onEdit,
  text: { id, processedTermCount },
}) => {
  const history = useHistory();
  return (
    <span>
      <IconButton
        disabled={processedTermCount === 0}
        color="primary"
        onClick={() => history.push(`/text/read/${id}`)}
      >
        <ChromeReaderModeIcon />
      </IconButton>
      <DeleteTextButton textId={id} />
      <IconButton color="primary" onClick={() => onEdit(id)}>
        <EditIcon />
      </IconButton>
    </span>
  );
};

export default TextActions;
