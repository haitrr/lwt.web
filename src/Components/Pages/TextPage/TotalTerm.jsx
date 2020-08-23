import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadTermCountAction } from "../../../Actions/TextAction";

class TotalTerm extends React.Component {
  componentDidMount() {
    const { value, record, loadTermCounts } = this.props;
    if (value === undefined) {
      loadTermCounts(record.id);
    }
  }

  render() {
    const { value } = this.props;
    if (!value) {
      return <span>-</span>;
    }
    let sum = 0;
    Object.keys(value).map(key => {
      sum += value[key];
      return null;
    });
    return <span>{sum}</span>;
  }
}

TotalTerm.propTypes = {
  value: PropTypes.any,
  record: PropTypes.any
};

export default connect(null, { loadTermCounts: loadTermCountAction })(
  TotalTerm
);
