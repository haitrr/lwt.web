import React from "react";
import {connect} from "react-redux";
import {TermLearningColor, TermLearningLevel} from "../../../Enums";
import SingleBarChart from "../../SingleBarChart";
import {loadReadingTexttermsCountByLearningLevelAction} from "../../../Actions/TextAction";
import styles from "../../Term/Term.module.scss";
import Loading from "../../Loading/Loading";
import {usePrevious} from "../../../Hooks/usePrevious";
import {Term} from "../../../Reducers/TextReducer";
import {RootState} from "../../../RootReducer";

function getPracticeCount(termCount: number, termCountByLearningLevel: any) {
  return (
    termCount -
    termCountByLearningLevel[TermLearningLevel.Skipped] -
    termCountByLearningLevel[TermLearningLevel.Ignored] -
    termCountByLearningLevel[TermLearningLevel.WellKnow]
  );
}

interface Props {
  loadTermsCountByLearningLevel: Function;
  termCount: number;
  termsCountByLearningLevel: any;
  textId: number;
  terms: Term[];
  bookmark: number;
}

const TextStatistic: React.FC<Props> = (
  {
    loadTermsCountByLearningLevel,
    termCount,
    termsCountByLearningLevel,
    textId,
    terms,
    bookmark
  }) => {
  React.useEffect(() => {
    loadTermsCountByLearningLevel(textId);
  }, [loadTermsCountByLearningLevel, textId])


  const prevProps = usePrevious({bookmark, terms})
  const bookmarkLL = terms[bookmark]?.learningLevel
  const prevBookmarkLL = prevProps?.terms[prevProps.bookmark]?.learningLevel
  React.useEffect(() => {
    if (
      bookmark === prevProps?.bookmark &&
      terms[bookmark] &&
      prevProps.terms[bookmark] &&
      bookmarkLL !== prevBookmarkLL
    ) {
      loadTermsCountByLearningLevel(textId);
    }
  }, [terms, bookmarkLL, prevBookmarkLL, bookmark, prevProps,textId, loadTermsCountByLearningLevel])

  if (!termsCountByLearningLevel) {
    return (
      <div style={{height: "2rem"}}>
        <Loading/>
      </div>
    );
  }
  const termCountByLearningLevel = termsCountByLearningLevel;
  const statistic: any = [];
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

export default connect(
  (state: RootState) => {
    if (state.text.readingText == null) {
      throw new Error("not reading text");
    }
    return ({
      textId: state.text.readingText.id,
      terms: state.text.readingText.terms,
      termsCountByLearningLevel: state.text.readingText.termsCountByLearningLevel,
      bookmark: state.text.readingText.bookmark,
      termCount: state.text.readingText.termCount,
    });
  },
  {
    loadTermsCountByLearningLevel: loadReadingTexttermsCountByLearningLevelAction,
  }
)(TextStatistic);
