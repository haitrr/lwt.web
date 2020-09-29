import React from "react";
import icon from "./icon.svg";
import styles from "./GoToBookmarkButton.module.scss";

interface GoToBookmarkButtonProps {
  onClick: () => void;
}

const GoToBookmarkButton: React.FC<GoToBookmarkButtonProps> = ({ onClick }) => (
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
