import PropTypes from "prop-types";
import React from "react";
import { Radio } from "antd";
import styles from "./LearningLevelSelect.module.scss";
import { TermLearningLevel, TermLearningColor } from "../../../Enums";

// form item need to be class component.
// eslint-disable-next-line react/prefer-stateless-function
export default class LearningLevelSelect extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { value } = this.props;
    return value !== nextProps.value;
  }

  render() {
    const { value, onChange } = this.props;
    return (
      <Radio.Group onChange={onChange} className={styles.select} value={value}>
        <Radio.Button
          className={TermLearningColor[TermLearningLevel.UnKnow]}
          value={TermLearningLevel.UnKnow}
        >
          UK
        </Radio.Button>
        <Radio.Button
          className={TermLearningColor[TermLearningLevel.Learning1]}
          value={TermLearningLevel.Learning1}
        >
          L1
        </Radio.Button>
        <Radio.Button
          className={TermLearningColor[TermLearningLevel.Learning2]}
          value={TermLearningLevel.Learning2}
        >
          L2
        </Radio.Button>
        <Radio.Button
          className={TermLearningColor[TermLearningLevel.Learning3]}
          value={TermLearningLevel.Learning3}
        >
          L3
        </Radio.Button>
        <Radio.Button
          className={TermLearningColor[TermLearningLevel.Learning4]}
          value={TermLearningLevel.Learning4}
        >
          L4
        </Radio.Button>
        <Radio.Button
          className={TermLearningColor[TermLearningLevel.Learning5]}
          value={TermLearningLevel.Learning5}
        >
          L5
        </Radio.Button>
        <Radio.Button
          className={TermLearningColor[TermLearningLevel.WellKnow]}
          value={TermLearningLevel.WellKnow}
        >
          WK
        </Radio.Button>
        <Radio.Button
          className={TermLearningColor[TermLearningLevel.Ignored]}
          value={TermLearningLevel.Ignored}
        >
          I
        </Radio.Button>
      </Radio.Group>
    );
  }
}

LearningLevelSelect.propTypes = {
  // eslint-disable-next-line react/require-default-props
  onChange: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.string,
};
