import PropTypes from "prop-types";
import React from "react";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { TermLearningColor, TermLearningLevel } from "../../../Enums";
import SingleBarChart from "../../SingleBarChart";
import { loadReadingTexttermsCountByLearningLevelAction } from "../../../Actions/TextAction";

function getPracticeCount(termCount, termCountByLearningLevel) {
  return (
    termCount -
    termCountByLearningLevel[TermLearningLevel.Skipped] -
    termCountByLearningLevel[TermLearningLevel.Ignored] -
    termCountByLearningLevel[TermLearningLevel.WellKnow]
  );
}

function getTotalCount(termCount, termCountByLearningLevel) {
  return termCount - termCountByLearningLevel[TermLearningLevel.Skipped];
}

class TextStatistic extends React.PureComponent {
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { terms, loadtermsCountByLearningLevel, textId } = this.props;
    if (terms !== prevProps.terms) {
      loadtermsCountByLearningLevel(textId);
    }
  }

  render() {
    const { termsCountByLearningLevel, termCount } = this.props;
    if (!termsCountByLearningLevel) {
      return <div>Loading</div>;
    }
    const termCountByLearningLevel = termsCountByLearningLevel;
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
        color: TermLearningColor[TermLearningLevel[learningLevel]]
      });
    });
    const practice = getPracticeCount(termCount, termCountByLearningLevel);
    const total = getTotalCount(termCount, termCountByLearningLevel);
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

TextStatistic.defaultProps = {
  termsCountByLearningLevel: undefined
};

TextStatistic.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  textId: PropTypes.number.isRequired,
  termCount: PropTypes.number.isRequired,
  termsCountByLearningLevel: PropTypes.shape({}),
  loadtermsCountByLearningLevel: PropTypes.func.isRequired
};

export default connect(
  state => ({
    textId: state.text.readingText.id,
    terms: state.text.readingText.terms,
    termsCountByLearningLevel: state.text.readingText.termsCountByLearningLevel,
    termCount: state.text.readingText.termCount
  }),
  {
    loadtermsCountByLearningLevel: loadReadingTexttermsCountByLearningLevelAction
  }
)(TextStatistic);
