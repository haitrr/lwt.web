import React from "react";
import { connect } from "react-redux";
import styles from "./TextReadPage.module.scss";
import { selectTotalTerm } from "../../../Selectors/TextSelector";
import { RootState } from "../../../RootReducer";

interface StateProps {
  current: number;
  total: number;
}

type Props = StateProps;

const ProgressBar: React.FC<Props> = ({ current, total }) => (
  <div className={styles.progress}>
    <div
      style={{
        height: `${(current * 100) / total}%`,
      }}
      className={styles.done}
    />
  </div>
);

ProgressBar.defaultProps = {
  current: 0,
};

export default connect<StateProps, {}, {}, RootState>((state: RootState) => {
  if (!state.text.readingText) throw new Error();
  return {
    current: state.text.readingText.viewingTermIndex,
    total: selectTotalTerm(state),
  };
})(ProgressBar);
