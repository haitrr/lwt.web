import React from "react";
import styles from "./TextReadPage.module.scss";

interface Props {
  title: string;
}

const TextTitle: React.FC<Props> = ({ title }) => {
  return <div className={styles.titleSection}>{title}</div>;
};

export default TextTitle;
