import React from "react";
import { connect } from "react-redux";
import { Button, Tooltip } from "antd";
import PropTypes from "prop-types";
import { getTermAction, setEditingTermAction } from "../../Actions/TermAction";
import "./term.scss";
import { TermLearningLevel } from "../../Enums";

class Term extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { term } = this.props;
    return (
      nextProps.term.learningLevel !== term.learningLevel ||
      nextProps.term.meaning !== term.meaning
    );
  }

  handleTermClick = term => {
    const { getTerm, setEditingTerm, onTermClick } = this.props;
    onTermClick(term);
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
        overlayStyle={{ pointerEvents: "none", whiteSpace: "pre-line" }}
        title={term.meaning ? term.meaning : null}
      >
        <Button
          className={`term term-${term.learningLevel}`}
          onClick={() => this.handleTermClick(term)}
          htmlType="button"
        >
          {
            // need react fragment here to prevent stupid ant design
            // to insert a space between two chinese characters.
          }
          <React.Fragment>{term.content}</React.Fragment>
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
  }).isRequired,
  onTermClick: PropTypes.func.isRequired
};

export default connect(
  null,
  { getTerm: getTermAction, setEditingTerm: setEditingTermAction }
)(Term);
