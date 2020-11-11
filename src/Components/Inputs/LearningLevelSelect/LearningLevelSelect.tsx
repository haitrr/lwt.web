import React from "react";
import styles from "./LearningLevelSelect.module.scss";
import {
  TermLearningLevel,
  TermLearningColor,
  TermLearningLevelShortcut,
} from "../../../Enums";
import Option from "./Option";

const optionLevels = [
  TermLearningLevel.UnKnow,
  TermLearningLevel.Learning1,
  TermLearningLevel.Learning2,
  TermLearningLevel.Learning3,
  TermLearningLevel.Learning4,
  TermLearningLevel.Learning5,
  TermLearningLevel.WellKnow,
  TermLearningLevel.Ignored,
];

const options = optionLevels.map((ol) => ({
  value: ol,
  className: TermLearningColor[ol],
  label: TermLearningLevelShortcut[ol],
}));

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const LearningLevelSelect: React.FC<Props> = ({ onChange, value }) => {
  const onClick = (val: string) => {
    onChange(val);
  };

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <Option
          key={option.value}
          className={option.className}
          selected={option.value === value}
          onClick={() => onClick(option.value)}
        >
          {option.label}
        </Option>
      ))}
    </div>
  );
};

export default LearningLevelSelect;
