import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";
import {TermLearningColor, TermLearningLevel} from "../../../Enums";
import SingleBarChart from "../../SingleBarChart";
import {loadReadingTexttermsCountByLearningLevelAction} from "../../../Actions/TextAction";
import styles from "../../Term/Term.module.scss";
import Loading from "../../Loading/Loading";
import {usePrevious} from "../../../Hooks/usePrevious";

function getPracticeCount(termCount, termCountByLearningLevel) {
  return (
    termCount -
    termCountByLearningLevel[TermLearningLevel.Skipped] -
    termCountByLearningLevel[TermLearningLevel.Ignored] -
    termCountByLearningLevel[TermLearningLevel.WellKnow]
  );
}

const TextStatistic = (
  {
    loadtermsCountByLearningLevel,
    termCount,
    termsCountByLearningLevel,
    textId,
    terms,
    bookmark
  }) => {
  React.useEffect(() => {
    loadtermsCountByLearningLevel(textId);
  }, [])


  const prevProps = usePrevious({bookmark, terms})
  React.useEffect(() => {
    if (
      bookmark === prevProps.bookmark &&
      terms[bookmark] &&
      prevProps.terms[bookmark]
    ) {
      loadtermsCountByLearningLevel(textId);
    }
  }, [terms[bookmark]?.learningLevel])

  if (!termsCountByLearningLevel) {
    return (
      <div style={{height: "2rem"}}>
        <Loading/>
      </div>
    );
  }
  const termCountByLearningLevel = termsCountByLearningLevel;
  const statistic = [];
  const learningStatistic = [];
  Object.keys(TermLearningLevel).forEach((learningLevel) => {
    if (
      learningLevel === "Skipped" ||
      learningLevel === "Ignored" ||
      learningLevel === "WellKnow"
    )
      return;
    statistic.push({
      name: learningLevel,
      value: termCountByLearningLevel[TermLearningLevel[learningLevel]],
      color: TermLearningColor[TermLearningLevel[learningLevel]],
    });
  });
  const practice = getPracticeCount(termCount, termCountByLearningLevel);
  learningStatistic.push({
    name: "Learned",
    color: styles.termLearned,
    value: termCountByLearningLevel[TermLearningLevel.WellKnow],
  });
  learningStatistic.push({
    name: "Learning",
    color: styles.termLearning,
    value: practice,
  });
  return (
    <div style={{width: "100%"}}>
      <SingleBarChart data={learningStatistic}/>
      <SingleBarChart data={statistic}/>
    </div>
  );
}

TextStatistic.defaultProps = {
  termsCountByLearningLevel: undefined,
};

TextStatistic.propTypes = {
  terms: PropTypes.arrayOf(
    PropTypes.shape({learningLevel: PropTypes.string.isRequired})
  ).isRequired,
  textId: PropTypes.number.isRequired,
  termCount: PropTypes.number.isRequired,
  bookmark: PropTypes.number.isRequired,
  termsCountByLearningLevel: PropTypes.shape({}),
  loadtermsCountByLearningLevel: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    textId: state.text.readingText.id,
    terms: state.text.readingText.terms,
    termsCountByLearningLevel: state.text.readingText.termsCountByLearningLevel,
    bookmark: state.text.readingText.bookmark,
    termCount: state.text.readingText.termCount,
  }),
  {
    loadtermsCountByLearningLevel: loadReadingTexttermsCountByLearningLevelAction,
  }
)(TextStatistic);
