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
import { RootState } from "../../../RootReducer";
import { ReadingTextState, TextTermState } from "../../../Reducers/TextReducer";

interface ContentPanelProps {
  end: number;
  begin: number;
  setTermIndexEnd: Function;
  setTermIndexBegin: Function;
  text: ReadingTextState;
  getTextTerms: Function;
  textId: number;
  bookmarkRef: any;
  terms: any[];
  termCount: number;
  editingTerm: number;
  setEditingTerm: Function;
  onSpeak: (term: TextTermState) => void;
}

class ContentPanel extends React.Component<ContentPanelProps> {
  displayTerms: number = 0;

  loadTerms: number = 0;

  begin: any = null;

  last: any = null;

  container: any = null;

  constructor(props: ContentPanelProps) {
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
    const { end, setTermIndexEnd, begin, setTermIndexBegin, text } = this.props;
    setTermIndexEnd(Math.min(end + this.displayTerms, text.length - 1));
    setTermIndexBegin(Math.max(begin - Math.floor(this.displayTerms / 2), 0));
  }

  componentDidUpdate(prevProps: ContentPanelProps) {
    const { begin, end, getTextTerms, textId, terms } = this.props;
    if (begin < prevProps.begin) {
      getTextTerms(textId, begin, prevProps.begin - 1);
    }

    if (prevProps.terms[begin] !== terms[begin] && this.last) {
      this.last.scrollIntoView();
    }

    if (end > prevProps.end) {
      getTextTerms(textId, prevProps.end + 1, end);
    }
  }

  goToBookmark = () => {
    const { bookmarkRef } = this.props;
    if (bookmarkRef.current) {
      bookmarkRef.current.scrollIntoView({ block: "center" });
    }
  };

  handleScroll = (e: any) => {
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

export default connect(
  (state: RootState) => {
    if (!state.text.readingText) throw new Error();
    return {
      terms: state.text.readingText.terms,
      begin: state.text.readingText.termIndexBegin,
      end: state.text.readingText.termIndexEnd,
      termCount: state.text.readingText.termCount,
      editingTerm: state.term.editingTerm,
      text: state.text.readingText,
    };
  },
  {
    getTextTerms: getTextTermsAction,
    setTermIndexBegin: setTermIndexBeginAction,
    setTermIndexEnd: setTermIndexEndAction,
    setEditingTerm: setEditingTermAction,
  }
)(ContentPanel);
