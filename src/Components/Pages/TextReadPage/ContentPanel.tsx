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
  terms: TextTermState[];
  termCount: number;
  editingTerm: number;
  setEditingTerm: Function;
  onSpeak: (term: TextTermState) => void;
}

interface ContentPanelState {
  loadingAtStart: boolean;
  loadingAtEnd: boolean;
}

class ContentPanel extends React.Component<
  ContentPanelProps,
  ContentPanelState
> {
  displayTerms: number = 0;

  loadTerms: number = 0;

  begin: any = null;

  last: any = null;

  container: any = null;

  constructor(props: ContentPanelProps) {
    super(props);
    if (window.innerWidth > 700) {
      // desktop
      this.displayTerms = 3000;
      this.loadTerms = 500;
    } else {
      // mobile
      this.displayTerms = 1500;
      this.loadTerms = 300;
    }

    this.begin = React.createRef();
    this.container = React.createRef();
  }

  componentDidMount() {
    const { end, setTermIndexEnd, begin, setTermIndexBegin, text } = this.props;
    this.setState({ loadingAtStart: true }, () => {
      setTermIndexBegin(Math.max(begin - Math.floor(this.displayTerms / 2), 0));
    });
    this.setState({ loadingAtEnd: true }, () => {
      setTermIndexEnd(Math.min(end + this.displayTerms, text.length - 1));
    });
  }

  componentDidUpdate(prevProps: ContentPanelProps) {
    const { begin, end, getTextTerms, textId, terms } = this.props;
    if (begin < prevProps.begin) {
      getTextTerms(textId, begin, prevProps.begin - 1).then(() =>
        this.setState({ loadingAtStart: false })
      );
    }

    if (prevProps.terms[begin] !== terms[begin] && this.last) {
      this.last.scrollIntoView();
    }

    if (end > prevProps.end) {
      getTextTerms(textId, prevProps.end + 1, end).then(() =>
        this.setState({ loadingAtEnd: false })
      );
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
      begin,
      editingTerm,
      setEditingTerm,
      end,
      text,
      setTermIndexEnd,
      setTermIndexBegin,
    } = this.props;
    if (editingTerm) {
      setEditingTerm(null);
    }

    const { loadingAtEnd, loadingAtStart } = this.state;
    // loading
    if (loadingAtStart || loadingAtEnd) {
      console.log(this.state);
      return;
    }
    const top = e.target.scrollTop < 100;
    if (top) {
      if (begin > 0) {
        this.setState({ loadingAtStart }, () => {
          setTermIndexBegin(Math.max(begin - this.loadTerms, 0));
          this.last = this.begin.current;
        });
        return;
      }
    }
    const bottom =
      e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 100;
    if (bottom) {
      if (end < text.length - 1) {
        this.setState({ loadingAtEnd: true }, () => {
          setTermIndexEnd(Math.min(end + this.loadTerms, text.length - 1));
        });
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
        term={t}
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
