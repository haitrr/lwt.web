import React from "react";
import { connect } from "react-redux";
import { Tooltip } from "antd";
import PropTypes from "prop-types";
import { getTermAction, setEditingTermAction } from "../../Actions/TermAction";
import styles from "./Term.module.scss";
import { TermLearningLevel } from "../../Enums";
import TermButton from "./TermButton";

class Term extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { term, bookmark, last } = this.props;
    return (
      nextProps.term.learningLevel !== term.learningLevel ||
      nextProps.term.meaning !== term.meaning ||
      nextProps.bookmark !== bookmark ||
      last !== nextProps.last
    );
  }

  handleTermClick = (e, term) => {
    e.preventDefault();
    const { getTerm, setEditingTerm, index, onTermClick } = this.props;
    onTermClick(term);
    setEditingTerm(index);
    if (term.id) {
      getTerm(term.id, index);
    }
  };

  render() {
    const { term, bookmark, last, bookmarkRef } = this.props;

    if (term.learningLevel === TermLearningLevel.Skipped) {
      return (
        <span
          className={styles.term}
          ref={r => {
            if (last) {
              last.current = r;
            }
          }}
        >
          {term.content}
        </span>
      );
    }
    if (term.learningLevel === TermLearningLevel.WellKnow) {
      return (
        <TermButton
          bookmark={bookmark}
          bookmarkRef={bookmarkRef}
          last={last}
          term={term}
          onClick={e => this.handleTermClick(e, term)}
        />
      );
    }
    return (
      <Tooltip
        overlayClassName={styles.tooltip}
        title={term.meaning && term.meaning.length > 0 ? term.meaning : null}
      >
        <TermButton
          bookmark={bookmark}
          bookmarkRef={bookmarkRef}
          last={last}
          term={term}
          onClick={e => this.handleTermClick(e, term)}
        />
      </Tooltip>
    );
  }
}

Term.defaultProps = {
  bookmark: false,
  last: null
};

Term.propTypes = {
  setEditingTerm: PropTypes.func.isRequired,
  getTerm: PropTypes.func.isRequired,
  term: PropTypes.shape({
    learningLevel: PropTypes.number.isRequired,
    meaning: PropTypes.string
  }).isRequired,
  onTermClick: PropTypes.func.isRequired,
  bookmark: PropTypes.bool,
  bookmarkRef: PropTypes.shape({}).isRequired,
  last: PropTypes.shape({}),
  index: PropTypes.number.isRequired
};

export default connect(
  (state, ownProps) => ({
    term: state.text.readingText.terms[ownProps.index],
    bookmark: state.text.readingText.bookmark === ownProps.index
  }),
  { getTerm: getTermAction, setEditingTerm: setEditingTermAction }
)(Term);
