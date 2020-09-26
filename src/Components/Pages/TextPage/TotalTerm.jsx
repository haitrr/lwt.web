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
TotalTerm.defaultProps = {
  value: undefined,
};

TotalTerm.propTypes = {
  value: PropTypes.number,
  record: PropTypes.shape({
    processedIndex: PropTypes.number,
    length: PropTypes.number,
  }).isRequired,
  loadTermCounts: PropTypes.func.isRequired,
};

export default connect(null, { loadTermCounts: loadTermCountAction })(
  TotalTerm
);
