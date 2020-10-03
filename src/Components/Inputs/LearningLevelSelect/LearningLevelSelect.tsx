import React from "react";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/es/radio";
import styles from "./LearningLevelSelect.module.scss";
import { TermLearningLevel, TermLearningColor } from "../../../Enums";

// form item need to be class component.
interface LearningLevelSelectProps {
  value: string;
  onChange: (e: RadioChangeEvent) => void;
}

// eslint-disable-next-line react/prefer-stateless-function
export default class LearningLevelSelect extends React.Component<
  LearningLevelSelectProps
> {
  shouldComponentUpdate(nextProps: LearningLevelSelectProps) {
    const { value } = this.props;
    return value !== nextProps.value;
  }

  render() {
    const { value, onChange } = this.props;
    return (
      <Radio.Group
        onChange={onChange}
        className={`${styles.select} not-invert`}
        value={value}
      >
        <Radio.Button
          style={{
            backgroundColor: TermLearningColor[TermLearningLevel.UnKnow],
          }}
          value={TermLearningLevel.UnKnow}
        >
          UK
        </Radio.Button>
        <Radio.Button
          style={{
            backgroundColor: TermLearningColor[TermLearningLevel.Learning1],
          }}
          value={TermLearningLevel.Learning1}
        >
          L1
        </Radio.Button>
        <Radio.Button
          style={{
            backgroundColor: TermLearningColor[TermLearningLevel.Learning2],
          }}
          value={TermLearningLevel.Learning2}
        >
          L2
        </Radio.Button>
        <Radio.Button
          style={{
            backgroundColor: TermLearningColor[TermLearningLevel.Learning3],
          }}
          value={TermLearningLevel.Learning3}
        >
          L3
        </Radio.Button>
        <Radio.Button
          style={{
            backgroundColor: TermLearningColor[TermLearningLevel.Learning4],
          }}
          value={TermLearningLevel.Learning4}
        >
          L4
        </Radio.Button>
        <Radio.Button
          style={{
            backgroundColor: TermLearningColor[TermLearningLevel.Learning5],
          }}
          value={TermLearningLevel.Learning5}
        >
          L5
        </Radio.Button>
        <Radio.Button
          style={{
            backgroundColor: TermLearningColor[TermLearningLevel.WellKnow],
          }}
          value={TermLearningLevel.WellKnow}
        >
          WK
        </Radio.Button>
        <Radio.Button
          style={{
            backgroundColor: TermLearningColor[TermLearningLevel.Ignored],
          }}
          value={TermLearningLevel.Ignored}
        >
          I
        </Radio.Button>
      </Radio.Group>
    );
  }
}
