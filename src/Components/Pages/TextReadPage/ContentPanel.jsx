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
  setTermIndexEndAction
} from "../../../Actions/TextAction";

class ContentPanel extends React.Component {
  constructor(props) {
    super(props);
    if (window.innerWidth > 700) {
      // desktop
      this.displayTerms = 1500;
      this.loadTerms = 300;
    } else {
      // mobile
      this.displayTerms = 750;
      this.loadTerms = 150;
    }

    this.begin = React.createRef();
    this.container = React.createRef();
  }

  componentDidMount() {
    const {
      end,
      setTermIndexEnd,
      begin,
      termCount,
      setTermIndexBegin
    } = this.props;
    setTermIndexEnd(Math.min(end + this.displayTerms, termCount - 1));
    setTermIndexBegin(Math.max(begin - this.displayTerms, 0));
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

  handleScroll = e => {
    e.stopPropagation();
    const {
      termCount,
      begin,
      end,
      setTermIndexEnd,
      setTermIndexBegin
    } = this.props;
    const bottom =
      e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 50;
    const top = e.target.scrollTop === 0;
    if (top) {
      if (begin > 0) {
        setTermIndexBegin(Math.max(begin - this.loadTerms, 0));
        this.last = this.begin.current;
      }
    }
    if (bottom) {
      if (end < termCount) {
        setTermIndexEnd(Math.min(end + this.loadTerms, termCount - 1));
      }
    }
  };

  render() {
    const { terms } = this.props;
    const { begin, end, bookmarkRef, onTermClick } = this.props;
    if (begin === end) {
      return <h1>Loading</h1>;
    }
    const termElements = [];
    for (let i = begin; i <= end; i += 1) {
      if (terms[i]) {
        termElements.push(
          <Term
            onTermClick={t => onTermClick(t, i)}
            bookmarkRef={bookmarkRef}
            last={begin === i ? this.begin : null}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            index={i}
          />
        );
      }
    }

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
  terms: null
};

ContentPanel.propTypes = {
  bookmarkRef: PropTypes.shape({}).isRequired,
  onTermClick: PropTypes.func.isRequired,
  terms: PropTypes.arrayOf(PropTypes.shape()),
  textId: PropTypes.number.isRequired,
  begin: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  setTermIndexBegin: PropTypes.func.isRequired,
  setTermIndexEnd: PropTypes.func.isRequired,
  termCount: PropTypes.number.isRequired,
  getTextTerms: PropTypes.func.isRequired
};
export default connect(
  state => ({
    terms: state.text.readingText.terms,
    begin: state.text.readingText.termIndexBegin,
    end: state.text.readingText.termIndexEnd,
    termCount: state.text.readingText.termCount
  }),
  {
    getTextTerms: getTextTermsAction,
    setTermIndexBegin: setTermIndexBeginAction,
    setTermIndexEnd: setTermIndexEndAction
  }
)(ContentPanel);
