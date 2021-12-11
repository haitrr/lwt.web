import React from "react";
import { connect } from "react-redux";
import styles from "./TextReadPage.module.scss";
import { RootState } from "../../../RootReducer";

interface Props {
  title: string;
}

const TextTitle: React.FC<Props> = ({ title }) => {
  if (window.innerWidth > 700) {
    return <div className={styles.titleSection}>{title}</div>;
  } else {
    // don't show title on mobile to save space
    return null;
  }
};

export default connect((state: RootState) => {
  if (!state.text.readingText) throw new Error();
  return {
    title: state.text.readingText.title,
  };
})(TextTitle);
