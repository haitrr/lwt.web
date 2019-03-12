import PropTypes from "prop-types";
import React from "react";
import { Radio } from "antd";
import styles from "./LearningLevelSelect.module.scss";

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
        <Radio.Button value={1}>UK</Radio.Button>
        <Radio.Button value={2}>L1</Radio.Button>
        <Radio.Button value={3}>L2</Radio.Button>
        <Radio.Button value={4}>L3</Radio.Button>
        <Radio.Button value={5}>L4</Radio.Button>
        <Radio.Button value={6}>L5</Radio.Button>
        <Radio.Button value={7}>WK</Radio.Button>
        <Radio.Button value={0}>I</Radio.Button>
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
