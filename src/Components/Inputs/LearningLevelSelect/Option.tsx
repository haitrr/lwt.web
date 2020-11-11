import classNames from "classnames";
import React from "react";
import styles from "./LearningLevelSelect.module.scss";

interface Props {
  onClick: () => void;
  className: string;
  selected: boolean;
}

const Option: React.FC<Props> = ({
  onClick,
  className,
  children,
  selected,
}) => {
  const cn = classNames(className, styles.option, {
    [styles.selected]: selected,
  });
  return (
    <div
      role="button"
      tabIndex={-1}
      onKeyDown={onClick}
      onClick={onClick}
      className={cn}
    >
      {children}
    </div>
  );
};

export default Option;
