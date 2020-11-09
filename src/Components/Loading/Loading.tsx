import { CircularProgress } from "@material-ui/core";
import React from "react";
import styles from "./Loading.module.scss";

interface Props {
  color?: "primary" | "secondary" | "inherit";
}

const Loading: React.FC<Props> = ({ color }) => {
  return (
    <div className={styles.loading}>
      <CircularProgress color={color} />
    </div>
  );
};

export default Loading;
