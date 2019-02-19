import React from "react";
import { connect } from "react-redux";
import { Button, Tooltip } from "antd";
import PropTypes from "prop-types";
import { getTermAction, setEditingTermAction } from "../../Actions/TermAction";
import styles from "./Term.module.scss";

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
    return (
      <Tooltip
        overlayClassName={styles.tooltip}
        title={term.meaning && term.meaning.length > 0 ? term.meaning : null}
      >
        <Button
          className={`${styles.term} ${styles[`term-${term.learningLevel}`]}`}
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
