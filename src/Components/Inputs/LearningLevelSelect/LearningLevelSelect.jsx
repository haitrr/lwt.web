import React from "react";
import { Radio } from "antd";

class LearningLevelSelect extends React.Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <Radio.Group onChange={onChange} value={value} buttonStyle="solid">
        <Radio.Button value={2}> Learning 1</Radio.Button>
        <Radio.Button value={3}> Learning 2</Radio.Button>
        <Radio.Button value={4}> Learning 3</Radio.Button>
        <Radio.Button value={5}> Learning 4</Radio.Button>
        <Radio.Button value={6}> Learning 5</Radio.Button>
        <Radio.Button value={7}> Well Known</Radio.Button>
        <Radio.Button value={0}> Ignore</Radio.Button>
      </Radio.Group>
    );
  }
}

export default LearningLevelSelect;
