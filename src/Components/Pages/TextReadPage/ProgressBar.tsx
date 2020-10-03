import React from "react";
import { connect } from "react-redux";
import styles from "./TextReadPage.module.scss";
import {
  selectBookmark,
  selectTotalTerm,
} from "../../../Selectors/TextSelector";
import { RootState } from "../../../RootReducer";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => (
  <div className={styles.progress}>
    <div
      style={{
        height: `${(current * 100) / total}%`,
      }}
      className={styles.done}
    />
  </div>
);

export default connect((state: RootState) => ({
  current: selectBookmark(state),
  total: selectTotalTerm(state),
}))(ProgressBar);
