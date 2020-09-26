import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import styles from "./TextReadPage.module.scss";
import Term from "../../Term";
import ProgressBar from "./ProgressBar";
import GoToBookmarkButton from "./GoToBookmarkButton";
import {
  getTextTermsAction,
  setTermIndexBeginAction,
  setTermIndexEndAction,
} from "../../../Actions/TextAction";
import { setEditingTermAction } from "../../../Actions/TermAction";

class ContentPanel extends React.Component {
  constructor(props) {
    super(props);
    if (window.innerWidth > 700) {
      // desktop
      this.displayTerms = 10000;
      this.loadTerms = 3000;
    } else {
      // mobile
      this.displayTerms = 7500;
      this.loadTerms = 1500;
    }

    this.begin = React.createRef();
    this.container = React.createRef();
  }

  componentDidMount() {
    const {
      end,
      setTermIndexEnd,
      begin,
      setTermIndexBegin,
      text,
    } = this.props;
    setTermIndexEnd(Math.min(end + this.displayTerms, text.length - 1));
    setTermIndexBegin(Math.max(begin - Math.floor(this.displayTerms / 2), 0));
  }

  componentDidUpdate(prevProps) {
    const { begin, end, getTextTerms, textId, terms } = this.props;
    if (begin < prevProps.begin) {
      getTextTerms(textId, begin, prevProps.begin);
    }

    if (prevProps.terms[begin] !== terms[begin] && this.last) {
      this.last.scrollIntoView();
    }

    if (end > prevProps.end) {
      getTextTerms(textId, prevProps.end, end);
    }
  }

  goToBookmark = () => {
    const { bookmarkRef } = this.props;
    if (bookmarkRef.current) {
      bookmarkRef.current.scrollIntoView({ block: "center" });
    }
  };

  handleScroll = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.id !== "contentPanel") {
      return;
    }
    const {
      termCount,
      begin,
      editingTerm,
      setEditingTerm,
      end,
      setTermIndexEnd,
      setTermIndexBegin,
      terms,
    } = this.props;
    if (editingTerm) {
      setEditingTerm(null);
    }
    // loading
    if (!terms[begin] || !terms[end]) {
      return;
    }
    const top = e.target.scrollTop < 100;
    if (top) {
      if (begin > 0) {
        setTermIndexBegin(Math.max(begin - this.loadTerms, 0));
        this.last = this.begin.current;
        return;
      }
    }
    const bottom =
      e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 100;
    if (bottom) {
      if (end < termCount - 1) {
        setTermIndexEnd(Math.min(end + this.loadTerms, termCount - 1));
      }
    }
  };

  render() {
    const { terms } = this.props;
    const { begin, end, bookmarkRef, onSpeak } = this.props;
    if (begin === end) {
      return <h1>Loading</h1>;
    }
    const termElements = terms.map((t, i) => (
      <Term
        onSpeak={onSpeak}
        last={i === 0 ? this.begin : null}
        key={t.indexFrom}
        textTermId={t.textTermId}
        bookmarkRef={bookmarkRef}
      />
    ));
    return (
      <Fragment>
        <div
          onScroll={this.handleScroll}
          id="contentPanel"
          className={styles.contentPanel}
          ref={this.container}
        >
          {termElements}
        </div>
        <GoToBookmarkButton onClick={this.goToBookmark} />
        <ProgressBar />
      </Fragment>
    );
  }
}

ContentPanel.defaultProps = {
  terms: null,
  editingTerm: null,
};

ContentPanel.propTypes = {
  bookmarkRef: PropTypes.shape({}).isRequired,
  terms: PropTypes.arrayOf(PropTypes.shape()),
  textId: PropTypes.number.isRequired,
  begin: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  setTermIndexBegin: PropTypes.func.isRequired,
  setTermIndexEnd: PropTypes.func.isRequired,
  termCount: PropTypes.number.isRequired,
  getTextTerms: PropTypes.func.isRequired,
  onSpeak: PropTypes.func.isRequired,
  editingTerm: PropTypes.number,
  setEditingTerm: PropTypes.func.isRequired,
};
export default connect(
  (state) => ({
    terms: state.text.readingText.terms,
    begin: state.text.readingText.termIndexBegin,
    end: state.text.readingText.termIndexEnd,
    termCount: state.text.readingText.termCount,
    editingTerm: state.term.editingTerm,
    text: state.text.readingText,
  }),
  {
    getTextTerms: getTextTermsAction,
    setTermIndexBegin: setTermIndexBeginAction,
    setTermIndexEnd: setTermIndexEndAction,
    setEditingTerm: setEditingTermAction,
  }
)(ContentPanel);
