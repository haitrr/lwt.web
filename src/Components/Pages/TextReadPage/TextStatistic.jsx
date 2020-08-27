import PropTypes from "prop-types";
import React from "react";
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

class TextStatistic extends React.PureComponent {
  componentDidMount() {
    const { loadtermsCountByLearningLevel, textId } = this.props;
    loadtermsCountByLearningLevel(textId);
  }

  componentDidUpdate(prevProps) {
    const {
      terms,
      bookmark,
      loadtermsCountByLearningLevel,
      textId
    } = this.props;
    if (
      bookmark === prevProps.bookmark &&
      terms[bookmark] &&
      prevProps.terms[bookmark] &&
      terms[bookmark].learningLevel !== prevProps.terms[bookmark].learningLevel
    ) {
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
    const learningStatistic = [];
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
    learningStatistic.push({
      name: "Learning",
      color: "#ebab34",
      value: practice
    });
    learningStatistic.push({
      name: "Learned",
      color: "#a8eb34",
      value: termCountByLearningLevel[TermLearningLevel.WellKnow]
    });
    return (
      <React.Fragment>
        <SingleBarChart data={learningStatistic} />
        <SingleBarChart data={statistic} />
      </React.Fragment>
    );
  }
}

TextStatistic.defaultProps = {
  termsCountByLearningLevel: undefined
};

TextStatistic.propTypes = {
  terms: PropTypes.arrayOf(
    PropTypes.shape({ learningLevel: PropTypes.string.isRequired })
  ).isRequired,
  textId: PropTypes.number.isRequired,
  termCount: PropTypes.number.isRequired,
  bookmark: PropTypes.number.isRequired,
  termsCountByLearningLevel: PropTypes.shape({}),
  loadtermsCountByLearningLevel: PropTypes.func.isRequired
};

export default connect(
  state => ({
    textId: state.text.readingText.id,
    terms: state.text.readingText.terms,
    termsCountByLearningLevel: state.text.readingText.termsCountByLearningLevel,
    bookmark: state.text.readingText.bookmark,
    termCount: state.text.readingText.termCount
  }),
  {
    loadtermsCountByLearningLevel: loadReadingTexttermsCountByLearningLevelAction
  }
)(TextStatistic);
