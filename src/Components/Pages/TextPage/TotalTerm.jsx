import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadTermCountAction } from "../../../Actions/TextAction";
import { TermLearningLevel } from "../../../Enums";

class TotalTerm extends React.Component {
  componentDidMount() {
    const { value, record, loadTermCounts } = this.props;
    if (value === undefined) {
      loadTermCounts(record.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { value, record, loadTermCounts } = this.props;
    console.log(record);
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
TotalTerm.defaultProps = {
  value: undefined,
};

TotalTerm.propTypes = {
  value: PropTypes.number,
  record: PropTypes.shape({}).isRequired,
  loadTermCounts: PropTypes.func.isRequired,
};

export default connect(null, { loadTermCounts: loadTermCountAction })(
  TotalTerm
);
