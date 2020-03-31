import PropTypes from "prop-types";
import React from "react";
import icon from "./icon.svg";
import styles from "./GoToBookmarkButton.module.scss";

const GoToBookmarkButton = ({ onClick }) => (
  <button
    title="Go to bookmark"
    type="button"
    className={styles.button}
    onClick={onClick}
  >
    <img alt="Go to bookmark" className={styles.icon} src={icon} />
  </button>
);

export default GoToBookmarkButton;

GoToBookmarkButton.propTypes = {
  onClick: PropTypes.func.isRequired
};
