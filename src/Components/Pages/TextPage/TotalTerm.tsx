import React from "react";
import { connect } from "react-redux";
import { loadTermCountAction } from "../../../Actions/TextAction";
import { TermLearningLevel } from "../../../Enums";
import { TextItem } from "../../../Reducers/TextReducer";

interface Props {
  value: { [key: string]: number } | null;
  record: TextItem;
  loadTermCounts: (id: number) => void;
}

class TotalTerm extends React.Component<Props> {
  static defaultProps = {
    value: null,
  };

  componentDidMount() {
    const { value, record, loadTermCounts } = this.props;
    if (value === null) {
      loadTermCounts(record.id);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { value, record, loadTermCounts } = this.props;
    if (
      value === undefined ||
      record.termCount === 0 ||
      (prevProps.record.processedTermCount !== record.processedTermCount &&
        record.processedTermCount < record.termCount)
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
