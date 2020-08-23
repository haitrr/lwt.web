import PropTypes from "prop-types";
import React from "react";
import { Radio } from "antd";
import styles from "./LearningLevelSelect.module.scss";
import { TermLearningLevel } from "../../../Enums";

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
        <Radio.Button value={TermLearningLevel.UnKnow}>UK</Radio.Button>
        <Radio.Button value={TermLearningLevel.Learning1}>L1</Radio.Button>
        <Radio.Button value={TermLearningLevel.Learning2}>L2</Radio.Button>
        <Radio.Button value={TermLearningLevel.Learning3}>L3</Radio.Button>
        <Radio.Button value={TermLearningLevel.Learning4}>L4</Radio.Button>
        <Radio.Button value={TermLearningLevel.Learning5}>L5</Radio.Button>
        <Radio.Button value={TermLearningLevel.WellKnow}>WK</Radio.Button>
        <Radio.Button value={TermLearningLevel.Ignored}>I</Radio.Button>
      </Radio.Group>
    );
  }
}

LearningLevelSelect.propTypes = {
  // eslint-disable-next-line react/require-default-props
  onChange: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.number
};
