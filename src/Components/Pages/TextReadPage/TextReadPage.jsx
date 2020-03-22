import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { animateScroll } from "react-scroll";
import {
  readTextAction,
  selectTermAction,
  setBookmarkAction
} from "../../../Actions/TextAction";
import styles from "./TextReadPage.module.scss";
import TermEditForm from "../../Forms/TermEditForm";
import {
  getTermAction,
  setEditingTermAction
} from "../../../Actions/TermAction";
import ContentPanel from "./ContentPanel";
import TextStatistic from "./TextStatistic";

/**
 * text read page.
 */
class TextReadPage extends React.Component {
  componentDidMount() {
    const {
      readText,
      match: {
        params: { textId }
      }
    } = this.props;
    readText(textId);
    this.utt = new SpeechSynthesisUtterance();
    this.bookmark = React.createRef();
    window.speechSynthesis.onvoiceschanged = this.setSpeechVoice;
  }

  shouldComponentUpdate(nextProps) {
    const { terms } = this.props;
    return terms !== nextProps.terms;
  }

  componentDidUpdate(prevProps) {
    const { languages, language } = this.props;
    if (
      prevProps.languages !== languages ||
      !prevProps.language ||
      prevProps.language !== language
    ) {
      const languageS = languages.find(l => l.id === language);
      const voices = window.speechSynthesis.getVoices();
      if (languageS) {
        this.utt.lang = languageS.speakCode;
        if (languageS.speakCode === "zh-CN") {
          const googleVoice = voices.find(
            v => v.name === "Google 普通话（中国大陆）"
          );
          if (googleVoice) {
            this.utt.voice = googleVoice;
          } else {
            this.utt.voice = voices.find(v => v.lang === languageS.speakCode);
          }
        } else if (languageS.speakCode === "en-US") {
          const googleVoice = voices.find(v => v.name === "Google US English");
          if (googleVoice) {
            this.utt.voice = googleVoice;
          } else {
            this.utt.voice = voices.find(v => v.lang === languageS.speakCode);
          }
        }
      }
    }

    if (!prevProps.terms && this.bookmark.current) {
      animateScroll.scrollTo(
        this.bookmark.current.offsetTop -
          this.bookmark.current.parentNode.offsetTop -
          200,
        {
          containerId: "contentPanel",
          smooth: true,
          ignoreCancelEvents: true
        }
      );
    }
  }

  setSpeechVoice = () => {
    const { languages, language } = this.props;
    if (language && languages) {
      const languageS = languages.find(l => l.id === language);
      const voices = window.speechSynthesis.getVoices();
      if (languageS) {
        this.utt.lang = languageS.speakCode;
        if (languageS.speakCode === "zh-CN") {
          const googleVoice = voices.find(
            v => v.name === "Google 普通话（中国大陆）"
          );
          if (googleVoice) {
            this.utt.voice = googleVoice;
          } else {
            this.utt.voice = voices.find(v => v.lang === languageS.speakCode);
          }
        } else if (languageS.speakCode === "en-US") {
          const googleVoice = voices.find(v => v.name === "Google US English");
          if (googleVoice) {
            this.utt.voice = googleVoice;
          } else {
            this.utt.voice = voices.find(v => v.lang === languageS.speakCode);
          }
        }
      }
    }
  };

  onTermClick = (term, index) => {
    this.utt.text = term.content;
    window.speechSynthesis.speak(this.utt);
    const { setBookmark, id, selectTerm } = this.props;
    selectTerm(index);
    setBookmark(id, index);
  };

  render() {
    const { terms, title, bookmark } = this.props;
    if (!terms) {
      return null;
    }

    return (
      <div className={styles.readPane}>
        <div>
          <h2 className={styles.titleSection}>{title}</h2>
        </div>
        <TextStatistic />
        <ContentPanel
          terms={terms}
          onTermClick={this.onTermClick}
          bookmark={bookmark}
          bookmarkRef={this.bookmark}
        />
        <TermEditForm className={styles.termEditForm} />
      </div>
    );
  }
}

export default connect(
  state => {
    if (state.text.readingText)
      return {
        terms: state.text.readingText.terms,
        language: state.text.readingText.language,
        title: state.text.readingText.title,
        id: state.text.readingText.id,
        languages: state.language.languages,
        bookmark: state.text.readingText.bookmark
      };
    return { languages: state.language.languages };
  },
  {
    readText: readTextAction,
    getTerm: getTermAction,
    setEditingTerm: setEditingTermAction,
    setBookmark: setBookmarkAction,
    selectTerm: selectTermAction
  }
)(TextReadPage);
TextReadPage.defaultProps = {
  language: null,
  title: null,
  id: null,
  terms: null,
  bookmark: null
};

TextReadPage.propTypes = {
  match: PropTypes.shape().isRequired,
  readText: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setBookmark: PropTypes.func.isRequired,
  selectTerm: PropTypes.func.isRequired,
  language: PropTypes.number,
  title: PropTypes.string,
  id: PropTypes.string,
  terms: PropTypes.arrayOf(PropTypes.shape({})),
  bookmark: PropTypes.number
};
