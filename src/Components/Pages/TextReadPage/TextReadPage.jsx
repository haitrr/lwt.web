import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Speech from "speak-tts";
import { animateScroll } from "react-scroll";
import { readTextAction, setBookmarkAction } from "../../../Actions/TextAction";
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
    this.speech = new Speech();
    this.bookmark = React.createRef();
    this.speech.init();
  }

  shouldComponentUpdate() {
    const { readingText } = this.props;
    return !readingText;
  }

  componentDidUpdate(prevProps) {
    const { readingText, languages } = this.props;
    if (
      readingText &&
      (prevProps.languages !== languages || !prevProps.readingText)
    ) {
      const language = languages.find(l => l.id === readingText.language);
      if (language) {
        this.speech.setLanguage(language.speakCode);
        try {
          if (language.speakCode === "zh-CN") {
            this.speech.setVoice("Google 普通话（中国大陆）");
          }
          if (language.speakCode === "en-US") {
            this.speech.setVoice("Google US English");
          }
        } catch {
          // skip
        }
      }
    }
    if (!prevProps.readingText && this.bookmark.current) {
      animateScroll.scrollTo(
        this.bookmark.current.buttonNode.offsetTop -
          this.bookmark.current.buttonNode.parentNode.offsetTop -
          200,
        {
          containerId: "contentPanel",
          smooth: true,
          ignoreCancelEvents: true
        }
      );
    }
  }

  onTermClick = (term, index) => {
    this.speech.speak({ text: term.content, queue: false });
    const { setBookmark, readingText } = this.props;
    setBookmark(readingText.id, index);
  };

  render() {
    const { readingText } = this.props;
    if (!readingText) {
      return null;
    }

    return (
      <div className={styles.readPane}>
        <div>
          <h2 className={styles.titleSection}>{readingText.title}</h2>
        </div>
        <TextStatistic />
        <ContentPanel
          readingText={readingText}
          onTermClick={this.onTermClick}
          bookmark={this.bookmark}
        />
        <TermEditForm />
      </div>
    );
  }
}

export default connect(
  state => ({
    readingText: state.text.readingText,
    editingTerm: state.term.editingTerm,
    languages: state.language.languages
  }),
  {
    readText: readTextAction,
    getTerm: getTermAction,
    setEditingTerm: setEditingTermAction,
    setBookmark: setBookmarkAction
  }
)(TextReadPage);
TextReadPage.defaultProps = {
  readingText: null
};

TextReadPage.propTypes = {
  match: PropTypes.shape().isRequired,
  readText: PropTypes.func.isRequired,
  readingText: PropTypes.shape(),
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setBookmark: PropTypes.func.isRequired
};
