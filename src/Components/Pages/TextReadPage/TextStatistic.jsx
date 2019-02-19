import PropTypes from "prop-types";
import React from "react";
import { Tooltip } from "antd";
import { TermLearningColor, TermLearningLevel } from "../../../Enums";
import SingleBarChart from "../../SingleBarChart";

export default class TextStatistic extends React.PureComponent {
  render() {
    const { terms } = this.props;
    // todo: optimize
    const statistic = [];
    Object.keys(TermLearningLevel).forEach(learningLevel => {
      if (
        learningLevel === "Skipped" ||
        learningLevel === "Ignored" ||
        learningLevel === "WellKnow"
      )
        return;
      statistic.push({
        name: learningLevel,
        value: terms.filter(
          t => t.learningLevel === TermLearningLevel[learningLevel]
        ).length,
        color: TermLearningColor[learningLevel]
      });
    });

    const practice = statistic.map(i => i.value).reduce((a, b) => a + b);
    const total = terms.filter(
      t => t.learningLevel !== TermLearningLevel.Skipped
    ).length;
    return (
      <Tooltip
        title={`${practice}/${total} ~ ${Math.round(
          (practice * 100) / total
        )} %`}
      >
        <span>{}</span>
        <SingleBarChart data={statistic} />
      </Tooltip>
    );
  }
}

TextStatistic.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
