import React from "react";
import { connect } from "react-redux";
import { Button, Tooltip } from "antd";
import PropTypes from "prop-types";
import { getTermAction, setEditingTermAction } from "../../Actions/TermAction";
import "./term.css";
import { TermLearningLevel } from "../../Enums";

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
    const { term } = this.props;
    if (term.learningLevel === TermLearningLevel.Skipped) {
      return <span className="term">{term.content}</span>;
    }
    return (
      <Tooltip
        title={
          term.meaning ? (
            <p style={{ whiteSpace: "pre-line" }}>{term.meaning}</p>
          ) : null
        }
      >
        <Button
          className={`term term-${term.learningLevel}`}
          onClick={() => this.handleTermClick(term)}
          htmlType="button"
        >
          {term.content}
        </Button>
      </Tooltip>
    );
  }
}

Term.propTypes = {
  setEditingTerm: PropTypes.func.isRequired,
  getTerm: PropTypes.func.isRequired,
  term: PropTypes.shape({
    learningLevel: PropTypes.number.isRequired,
    meaning: PropTypes.string
  }).isRequired
};

export default connect(
  null,
  { getTerm: getTermAction, setEditingTerm: setEditingTermAction }
)(Term);
