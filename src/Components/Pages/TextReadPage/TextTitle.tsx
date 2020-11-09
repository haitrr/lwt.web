import React from "react";
import styles from "./TextReadPage.module.scss";

interface Props {
  title: string;
}

const TextTitle: React.FC<Props> = ({ title }) => {
  return <h2 className={styles.titleSection}>{title}</h2>;
};

export default TextTitle;
