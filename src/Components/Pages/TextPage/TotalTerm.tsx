import React from "react";
import { connect } from "react-redux";
import { loadTermCountAction } from "../../../Actions/TextAction";
import { TermLearningLevel } from "../../../Enums";
import { TextItemState } from "../../../Reducers/TextReducer";

interface TotalTermProps {
  value: { [key: string]: number };
  record: TextItemState;
  loadTermCounts: Function;
}

class TotalTerm extends React.Component<TotalTermProps> {
  componentDidMount() {
    const { value, record, loadTermCounts } = this.props;
    if (value === undefined) {
      loadTermCounts(record.id);
    }
  }

  componentDidUpdate(prevProps: TotalTermProps) {
    const { value, record, loadTermCounts } = this.props;
    if (
      value === undefined ||
      (prevProps.record.processedIndex !== record.processedIndex &&
        record.processedIndex < record.length - 1)
    ) {
      loadTermCounts(record.id);
    }
  }

  render() {
    const { value } = this.props;
    if (!value) {
      return <span>-</span>;
    }
    let sum = 0;
    Object.keys(value).map((key) => {
      if (key !== TermLearningLevel.Skipped) sum += value[key];
      return null;
    });
    return <span>{sum}</span>;
  }
}

export default connect(null, { loadTermCounts: loadTermCountAction })(
  TotalTerm
);
