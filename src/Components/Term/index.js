import React from "react";
import { connect } from "react-redux";
import { getTermAction, setEditingTermAction } from "../../Actions/TermAction";
import { Tooltip } from "antd";
import "./term.css";

class Term extends React.Component {
  handleTermClick = term => {
    const { getTerm, setEditingTerm } = this.props;
    if (term.id) {
      getTerm(term.id);
    } else {
      setEditingTerm(term);
    }
  };

  render() {
    const { term, index } = this.props;
    return (
      <Tooltip title={term.meaning}>
        <a
          className={`term term-${term.learningLevel}`}
          key={index}
          href
          onClick={() => this.handleTermClick(term)}
        >
          {" "}
          {term.content}
        </a>
      </Tooltip>
    );
  }
}

export default connect(
  null,
  { getTerm: getTermAction, setEditingTerm: setEditingTermAction }
)(Term);
