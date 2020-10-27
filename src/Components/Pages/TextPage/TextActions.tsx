import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, ReadOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import React from "react";
import styles from "./TextPage.module.scss";
import { Text } from "./TextsTable";

export interface TextActionsProps {
  text: Text;
  onDelete: Function;
  onEdit: Function;
}

const TextActions: React.FC<TextActionsProps> = (props) => {
  const { onDelete, onEdit } = props;
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
      <Popconfirm
        title="Confirm to delete this text."
        onConfirm={() => onDelete(id)}
        okText="Delete"
        okType="danger"
      >
        <DeleteOutlined className={styles.deleteButton} />
      </Popconfirm>
      <EditOutlined className={styles.editButton} onClick={() => onEdit(id)} />
    </span>
  );
};

export default TextActions;
