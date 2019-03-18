import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import styles from "./TextReadPage.module.scss";
import {
  selectBookmark,
  selectTotalTerm
} from "../../../Selectors/TextSelector";

const ProgressBar = ({ current, total }) => (
  <div className={styles.progress}>
    <div
      style={{
        height: `${(current * 100) / total}%`
      }}
      className={styles.done}
    />
  </div>
);

ProgressBar.defaultProps = {
  current: 0
};

ProgressBar.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number.isRequired
};

export default connect(state => ({
  current: selectBookmark(state),
  total: selectTotalTerm(state)
}))(ProgressBar);
