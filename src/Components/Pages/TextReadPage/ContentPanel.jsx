import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";
import styles from "./TextReadPage.module.scss";
import Term from "../../Term";
import ProgressBar from "./ProgressBar";
import GoToBookmarkButton from "./GoToBookmarkButton";
import {
  getTextTermsAction,
  setTermIndexBeginAction,
  setViewingTermAction,
  setTermIndexEndAction,
} from "../../../Actions/TextAction";
import {setEditingTermAction} from "../../../Actions/TermAction";
import Loading from "../../Loading/Loading";
import {LAST_BEGIN_INDEX_ID} from "../../Term/TermButton";
import TermObserver from "../../Term/TermObserver";
import {usePrevious} from "../../../Hooks/usePrevious";

const TermCountPerProgressPoint = 50;

let displayTerms;
let renderingLast;
let loadTerms;

const ContentPanel = (
  {
    end,
    setTermIndexEnd,
    begin,
    termCount,
    getTextTerms,
    textId,
    terms,
    editingTerm,
    setEditingTerm,
    onSpeak,
    setViewingTerm,
    setTermIndexBegin,
  }) => {
  React.useEffect(() => {
    if (window.innerWidth > 700) {
      // desktop
      displayTerms = 1000;
      loadTerms = 300;
    } else {
      // mobile
      displayTerms = 750;
      loadTerms = 150;
    }
    setTermIndexBegin(Math.max(begin - Math.floor(displayTerms / 2), 0));
    setTermIndexEnd(Math.min(end + displayTerms, termCount - 1));
  }, [])

  const container = React.createRef();
  const [loading, setLoading] = React.useState(true)

  const prevProps = usePrevious({begin})
  React.useEffect(() => {
    if (begin < prevProps.begin) {
      getTextTerms(textId, begin, prevProps.begin);
    }

    if (prevProps.terms[begin] !== terms[begin]) {
      scrollToLast();
    }

    // scroll to the bookmark ofter initial loading
    if (terms[begin] && terms[end] && loading) {
      const bookmarkEl = document.getElementById("bookmark");
      if (bookmarkEl) {
        setLoading(false);
        bookmarkEl.scrollIntoView({block: "center"});
      }
    }

    if (end > prevProps.end) {
      getTextTerms(textId, prevProps.end, end);
    }
  }, [begin, end])


  const scrollToLast = () => {
    const lastBeginEl = document.getElementById(LAST_BEGIN_INDEX_ID);
    if (lastBeginEl) {
      lastBeginEl.scrollIntoView();
      renderingLast = false;
    } else {
      renderingLast = true;
    }
  };

  const goToBookmark = () => {
    const bookmarkEl = document.getElementById("bookmark");
    if (bookmarkEl) {
      bookmarkEl.scrollIntoView({block: "center", behavior: "smooth"});
    }
  };

  const handleScroll = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.id !== "contentPanel") {
      return;
    }
    if (editingTerm) {
      setEditingTerm(null);
    }
    // loading
    if (!terms[begin] || !terms[end]) {
      return;
    }

    if (renderingLast) {
      scrollToLast();
      return;
    }

    const top = e.target.scrollTop < 100;
    if (top) {
      if (begin > 0) {
        setTermIndexBegin(Math.max(begin - loadTerms, 0));
        return;
      }
    }
    const bottom =
      e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 100;
    if (bottom) {
      if (end < termCount - 1) {
        setTermIndexEnd(Math.min(end + loadTerms, termCount - 1));
      }
    }
  };

  const handleTermVisible = (index) => (visible) => {
    if (visible) {
      clearTimeout(window.setViewingTermTimeout);
      window.setViewingTermTimeout = setTimeout(() => {
        setViewingTerm(index);
      }, 200);
    }
  };

  // initial loading
  if ((!terms[begin] || !terms[end]) && loading) {
    return (
      <div style={{height: "50%"}}>
        <Loading/>;
      </div>
    );
  }
  const termElements = [];
  for (let i = begin; i <= end; i += 1) {
    if (terms[i]) {
      if (i % TermCountPerProgressPoint === 0) {
        termElements.push(
          <TermObserver index={i}>
            <Term
              onSpeak={onSpeak}
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              index={i}
            />
          </TermObserver>
        );
      } else {
        termElements.push(
          <Term
            onSpeak={onSpeak}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            index={i}
          />
        );
      }
    }
  }

  return (
    <>
      <div
        onScroll={handleScroll}
        id="contentPanel"
        className={styles.contentPanel}
        ref={container}
      >
        {/* end loading */}
        {!terms[begin] && <Loading className={styles.loading}/>}
        {termElements}
        {/* begin loading */}
        {!terms[end] && <Loading className={styles.loading}/>}
        <ProgressBar/>
      </div>
      {!editingTerm && <GoToBookmarkButton onClick={goToBookmark}/>}
    </>
  );
}

ContentPanel.defaultProps = {
  terms: null,
  editingTerm: null,
};

ContentPanel.propTypes = {
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
  setViewingTerm: PropTypes.func.isRequired,
};
export default connect(
  (state) => ({
    terms: state.text.readingText.terms,
    begin: state.text.readingText.termIndexBegin,
    end: state.text.readingText.termIndexEnd,
    termCount: state.text.readingText.termCount,
    editingTerm: state.term.editingTerm,
  }),
  {
    getTextTerms: getTextTermsAction,
    setTermIndexBegin: setTermIndexBeginAction,
    setTermIndexEnd: setTermIndexEndAction,
    setEditingTerm: setEditingTermAction,
    setViewingTerm: setViewingTermAction,
  }
)(ContentPanel);
