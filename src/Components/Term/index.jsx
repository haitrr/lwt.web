import React from "react";
import { connect } from "react-redux";
import { Button, Tooltip } from "antd";
import PropTypes from "prop-types";
import { getTermAction, setEditingTermAction } from "../../Actions/TermAction";
import styles from "./Term.module.scss";
import { TermLearningLevel } from "../../Enums";

class Term extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { term, index, bookmark } = this.props;
    return (
      nextProps.term.learningLevel !== term.learningLevel ||
      nextProps.term.meaning !== term.meaning ||
      nextProps.bookmark === index ||
      bookmark === index
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

  renderTermButton = () => {
    const { term, bookmark, bookmarkRef, index } = this.props;
    let r = null;
    if (bookmark === index) {
      r = bookmarkRef;
    }
    return (
      <Button
        className={`${styles.term} ${styles[`term-${term.learningLevel}`]} ${
          bookmark === index ? styles.bookmark : null
        }`}
        ref={r}
        onClick={() => this.handleTermClick(term)}
        htmlType="button"
      >
        {
          // need react fragment here to prevent stupid ant design
          // to insert a space between two chinese characters.
        }
        <React.Fragment>{term.content}</React.Fragment>
      </Button>
    );
  };

  render() {
    const { term } = this.props;
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
  bookmark: 0
};

Term.propTypes = {
  setEditingTerm: PropTypes.func.isRequired,
  getTerm: PropTypes.func.isRequired,
  term: PropTypes.shape({
    learningLevel: PropTypes.number.isRequired,
    meaning: PropTypes.string
  }).isRequired,
  onTermClick: PropTypes.func.isRequired,
  bookmark: PropTypes.number,
  index: PropTypes.number.isRequired,
  bookmarkRef: PropTypes.shape({}).isRequired
};

export default connect(
  (state, ownProps) => ({
    term: state.text.readingText.terms[ownProps.index],
    bookmark: state.text.readingText.bookmark
  }),
  { getTerm: getTermAction, setEditingTerm: setEditingTermAction }
)(Term);
