import React from "react";
import { connect } from "react-redux";
import { TermLearningColor, TermLearningLevel } from "../../../Enums";
import SingleBarChart, { SingleBarChartItem } from "../../SingleBarChart";
import { loadReadingTexttermsCountByLearningLevelAction } from "../../../Actions/TextAction";
import { RootState } from "../../../RootReducer";
import { TermInfoState, TextTermState } from "../../../Reducers/TextReducer";

function getPracticeCount(
  termCount: number,
  termCountByLearningLevel: { [key: string]: number }
) {
  return (
    termCount -
    termCountByLearningLevel[TermLearningLevel.Skipped] -
    termCountByLearningLevel[TermLearningLevel.Ignored] -
    termCountByLearningLevel[TermLearningLevel.WellKnow]
  );
}

interface TextStatisticProps {
  textId: number;
  termCount: number;
  termsCountByLearningLevel: any;
  selectingTermValue: TermInfoState | null;
  selectingTerm: TextTermState | null;
  loadtermsCountByLearningLevel: Function;
  termValues: { [key: number]: TermInfoState };
}

class TextStatistic extends React.PureComponent<TextStatisticProps> {
  componentDidMount() {
    const { loadtermsCountByLearningLevel, textId } = this.props;
    loadtermsCountByLearningLevel(textId);
  }

  componentDidUpdate(prevProps: TextStatisticProps) {
    const { loadtermsCountByLearningLevel, textId, termValues } = this.props;
    if (termValues !== prevProps.termValues) {
      loadtermsCountByLearningLevel(textId);
    }
  }

  render() {
    const { termsCountByLearningLevel, termCount } = this.props;
    if (!termsCountByLearningLevel) {
      return <div>Loading</div>;
    }
    const termCountByLearningLevel = termsCountByLearningLevel;
    const statistic: SingleBarChartItem[] = [];
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
      color: "#a8eb34",
      value: termCountByLearningLevel[TermLearningLevel.WellKnow],
    });
    learningStatistic.push({
      name: "Learning",
      color: "#ebab34",
      value: practice,
    });
    return (
      <div>
        <SingleBarChart data={learningStatistic} />
        <SingleBarChart data={statistic} />
      </div>
    );
  }
}

export default connect(
  (state: RootState) => {
    if (!state.text.readingText) throw new Error();
    return {
      textId: state.text.readingText.id,
      termsCountByLearningLevel:
        state.text.readingText.termsCountByLearningLevel,
      termCount: state.text.readingText.termCount,
      selectingTerm: state.term.selectingTerm,
      termValues: state.text.readingText.termValues,
      selectingTermValue:
        state.text.readingText.termValues[state.term.selectingTerm?.id],
    };
  },
  {
    loadtermsCountByLearningLevel: loadReadingTexttermsCountByLearningLevelAction,
  }
)(TextStatistic);
