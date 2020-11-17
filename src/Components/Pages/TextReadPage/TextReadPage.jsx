import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { readTextAction } from "../../../Actions/TextAction";
import { setEditingTermAction } from "../../../Actions/TermAction";
import styles from "./TextReadPage.module.scss";
import TermEditForm from "../../Forms/TermEditForm";
import ContentPanel from "./ContentPanel";
import TextStatistic from "./TextStatistic";
import TextTitle from "./TextTitle";
import Loading from "../../Loading/Loading";

/**
 * text read page.
 */
class TextReadPage extends React.Component {
  componentDidMount() {
    const {
      readText,
      match: {
        params: { textId },
      },
    } = this.props;
    readText(textId);
    this.utt = new SpeechSynthesisUtterance();
    window.speechSynthesis.onvoiceschanged = this.setSpeechVoice;
  }

  shouldComponentUpdate(nextProps) {
    const { terms, id, language, languages } = this.props;
    return (
      terms !== nextProps.terms ||
      id !== nextProps.id ||
      languages !== nextProps.languages ||
      language !== nextProps.language
    );
  }

  componentDidUpdate(prevProps) {
    const { languages, language } = this.props;
    const shouldSetLanguage =
      prevProps.languages !== languages ||
      !prevProps.language ||
      !prevProps.languages ||
      prevProps.language !== language;
    if (shouldSetLanguage) {
      this.setSpeechVoice();
    }
  }

  componentWillUnmount() {
    const { setEditingTerm } = this.props;
    setEditingTerm(null);
  }

  setSpeechVoice = () => {
    const { languages, language } = this.props;
    if (language && languages) {
      const languageS = languages.find((l) => l.code === language);
      const voices = window.speechSynthesis.getVoices();
      if (languageS) {
        this.utt.lang = languageS.speakCode;
        if (languageS.speakCode === "zh-CN") {
          const googleVoice = voices.find(
            (v) => v.name === "Google 普通话（中国大陆）"
          );
          if (googleVoice) {
            this.utt.voice = googleVoice;
          } else {
            this.utt.voice = voices.find((v) => v.lang === languageS.speakCode);
          }
        } else if (languageS.speakCode === "en-US") {
          const googleVoice = voices.find(
            (v) => v.name === "Google US English"
          );
          if (googleVoice) {
            this.utt.voice = googleVoice;
          } else {
            this.utt.voice = voices.find((v) => v.lang === languageS.speakCode);
          }
        }
      }
    }
  };

  onSpeak = (term) => {
    this.utt.text = term.content;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(this.utt);
  };

  render() {
    const { terms, bookmark, id } = this.props;
    if (!id) {
      return <Loading />;
    }

    return (
      <div className={styles.readPane} id="readPanel">
        <TextTitle />
        <TextStatistic />
        <ContentPanel onSpeak={this.onSpeak} textId={id} bookmark={bookmark} />
        {terms && <TermEditForm className={styles.termEditForm} />}
      </div>
    );
  }
}

export default connect(
  (state) => {
    if (state.text.readingText) {
      return {
        terms: state.text.readingText.terms,
        language: state.text.readingText.languageCode,
        id: state.text.readingText.id,
        languages: state.language.languages,
        bookmark: state.text.readingText.bookmark,
      };
    }
    return { languages: state.language.languages };
  },
  {
    readText: readTextAction,
    setEditingTerm: setEditingTermAction,
  }
)(TextReadPage);
TextReadPage.defaultProps = {
  language: null,
  id: null,
  terms: null,
  bookmark: null,
};

TextReadPage.propTypes = {
  match: PropTypes.shape().isRequired,
  readText: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  language: PropTypes.number,
  id: PropTypes.number,
  terms: PropTypes.arrayOf(PropTypes.shape({})),
  bookmark: PropTypes.number,
  setEditingTerm: PropTypes.func.isRequired,
};
