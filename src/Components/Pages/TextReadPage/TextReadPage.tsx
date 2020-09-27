import React from "react";
import { connect } from "react-redux";
import { animateScroll } from "react-scroll";
import styles from "./TextReadPage.module.scss";
import TermEditForm from "../../Forms/TermEditForm";
import ContentPanel from "./ContentPanel";
import TextStatistic from "./TextStatistic";
import { RootState } from "../../../RootReducer";

interface TextReadPageProps {
  terms: any;
  id: any;
  language: any;
  languages: any[];
  title: string;
  bookmark: number;
}

/**
 * text read page.
 */
class TextReadPage extends React.Component<TextReadPageProps> {
  bookmark: any = null;

  utt: any = null;

  componentDidMount() {
    this.utt = new SpeechSynthesisUtterance();
    this.bookmark = React.createRef();
    window.speechSynthesis.onvoiceschanged = this.setSpeechVoice;
  }

  shouldComponentUpdate(nextProps: TextReadPageProps) {
    const { terms, id, language, languages } = this.props;
    return (
      terms !== nextProps.terms ||
      id !== nextProps.id ||
      languages !== nextProps.languages ||
      language !== nextProps.language
    );
  }

  componentDidUpdate(prevProps: TextReadPageProps) {
    const { languages, language } = this.props;
    const shouldSetLanguage =
      prevProps.languages !== languages ||
      !prevProps.language ||
      !prevProps.languages ||
      prevProps.language !== language;
    if (shouldSetLanguage) {
      this.setSpeechVoice();
    }

    if (!prevProps.terms && this.bookmark.current) {
      animateScroll.scrollTo(
        this.bookmark.current.offsetTop -
          this.bookmark.current.parentNode.offsetTop -
          200,
        {
          containerId: "contentPanel",
          smooth: true,
          ignoreCancelEvents: true,
        }
      );
    }
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

  onSpeak = (term: any) => {
    this.utt.text = term.content;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(this.utt);
  };

  render() {
    const { terms, title, bookmark, id } = this.props;
    if (!title) {
      return <h2>Loading</h2>;
    }
    return (
      <div className={styles.readPane}>
        <h2 className={styles.titleSection}>{title}</h2>
        <TextStatistic />
        <ContentPanel
          onSpeak={this.onSpeak}
          textId={id}
          bookmark={bookmark}
          bookmarkRef={this.bookmark}
        />
        {terms && <TermEditForm className={styles.termEditForm} />}
      </div>
    );
  }
}

export default connect((state: RootState) => {
  if (!state.text.readingText) throw new Error();
  return {
    terms: state.text.readingText.terms,
    language: state.text.readingText.languageCode,
    title: state.text.readingText.title,
    id: state.text.readingText.id,
    languages: state.language.languages,
    bookmark: state.text.readingText.bookmark,
  };
})(TextReadPage);
