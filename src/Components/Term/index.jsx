import React from "react";
import { connect } from "react-redux";
import { Tooltip } from "antd";
import PropTypes from "prop-types";
import { getTermAction, setEditingTermAction } from "../../Actions/TermAction";
import styles from "./Term.module.scss";
import { TermLearningLevel } from "../../Enums";

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
    const { getTerm, setEditingTerm, onTermClick } = this.props;
    onTermClick(term);
    if (term.id) {
      getTerm(term.id);
    } else {
      setEditingTerm(term);
    }
  };

  renderTermButton = () => {
    const { term, bookmark, bookmarkRef, last } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
      <span
        className={`${styles.term} ${styles[`term-${term.learningLevel}`]} ${
          bookmark ? styles.bookmark : null
        }`}
        ref={r => {
          if (bookmark) bookmarkRef.current = r;
          if (last) last.current = r;
        }}
        onClick={e => this.handleTermClick(e, term)}
      >
        {
          // need react fragment here to prevent stupid ant design
          // to insert a space between two chinese characters.
        }
        <React.Fragment>{term.content}</React.Fragment>
      </span>
    );
  };

  render() {
    const { term, last } = this.props;

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
      return this.renderTermButton(term);
    }
    return (
      <Tooltip
        overlayClassName={styles.tooltip}
        title={term.meaning && term.meaning.length > 0 ? term.meaning : null}
      >
        {this.renderTermButton(term)}
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
  last: PropTypes.shape({})
};

export default connect(
  (state, ownProps) => ({
    term: state.text.readingText.terms[ownProps.index],
    bookmark: state.text.readingText.bookmark === ownProps.index
  }),
  { getTerm: getTermAction, setEditingTerm: setEditingTermAction }
)(Term);
