import PropTypes from "prop-types";
import React, { Component } from "react";
import { Radio } from "antd";

// form item need to be class component.
// eslint-disable-next-line react/prefer-stateless-function
export default class LearningLevelSelect extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <Radio.Group onChange={onChange} value={value}>
        <Radio.Button value={1}>Unknown</Radio.Button>
        <Radio.Button value={2}>Learning 1</Radio.Button>
        <Radio.Button value={3}>Learning 2</Radio.Button>
        <Radio.Button value={4}>Learning 3</Radio.Button>
        <Radio.Button value={5}>Learning 4</Radio.Button>
        <Radio.Button value={6}>Learning 5</Radio.Button>
        <Radio.Button value={7}>Well Known</Radio.Button>
        <Radio.Button value={0}>Ignore</Radio.Button>
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
