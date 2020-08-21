import PropTypes from "prop-types";
import React from "react";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { TermLearningColor, TermLearningLevel } from "../../../Enums";
import SingleBarChart from "../../SingleBarChart";

const countTermByLearningLevel = terms => {
  const termCountByLearningLevel = { total: 0 };
  Object.keys(TermLearningLevel).forEach(learningLevel => {
    termCountByLearningLevel[TermLearningLevel[learningLevel]] = 0;
  });
  for (let i = 0; i < terms.length; i += 1) {
    termCountByLearningLevel[terms[i].learningLevel] += 1;
  }
  return termCountByLearningLevel;
};

function getPracticeCount(termCountByLearningLevel) {
  return (
    termCountByLearningLevel.total -
    termCountByLearningLevel[TermLearningLevel.Skipped] -
    termCountByLearningLevel[TermLearningLevel.Ignored] -
    termCountByLearningLevel[TermLearningLevel.WellKnow]
  );
}

function getTotalCount(terms, termCountByLearningLevel) {
  return terms.length - termCountByLearningLevel[TermLearningLevel.Skipped];
}

class TextStatistic extends React.PureComponent {
  render() {
    const { terms } = this.props;
    const termCountByLearningLevel = countTermByLearningLevel(terms);
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
        value: termCountByLearningLevel[TermLearningLevel[learningLevel]],
        color: TermLearningColor[learningLevel]
      });
    });
    const practice = getPracticeCount(termCountByLearningLevel);
    const total = getTotalCount(terms, termCountByLearningLevel);
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

export default connect(state => ({ terms: state.text.readingText.terms }))(
  TextStatistic
);
