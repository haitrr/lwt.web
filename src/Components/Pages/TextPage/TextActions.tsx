import { Link } from "react-router-dom";
import { EditOutlined, ReadOutlined } from "@ant-design/icons";
import React from "react";
import styles from "./TextPage.module.scss";
import { TextItem } from "../../../Reducers/TextReducer";
import DeleteTextButton from "./DeleteTextButton";

export interface TextActionsProps {
  text: TextItem;
  onEdit: Function;
}

const TextActions: React.FC<TextActionsProps> = (props) => {
  const { onEdit } = props;
  const { processedTermCount, id } = props.text;
  return (
    <span>
      <Link
        aria-disabled={processedTermCount === 0}
        className={styles.actionButton}
        to={`/text/read/${id}`}
      >
        <ReadOutlined />
      </Link>
      <DeleteTextButton textId={id} />
      <EditOutlined className={styles.editButton} onClick={() => onEdit(id)} />
    </span>
  );
};

export default TextActions;
