import { CircularProgress } from "@material-ui/core";
import React from "react";
import classNames from "classnames";
import styles from "./Loading.module.scss";

interface Props {
  color?: "primary" | "secondary" | "inherit";
  className: string | null;
}

const Loading: React.FC<Props> = ({ color, className }) => {
  const cn = classNames(styles.loading, className);
  return (
    <div className={cn}>
      <CircularProgress color={color} />
    </div>
  );
};

Loading.defaultProps = {
  className: null,
};

export default Loading;
