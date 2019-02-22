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

  shouldComponentUpdate(nextProps) {
    const { terms } = this.props;
    return terms !== nextProps.terms;
  }

  componentDidUpdate(prevProps) {
    const { languages, language } = this.props;
    if (prevProps.languages !== languages || !prevProps.language) {
      const languageS = languages.find(l => l.id === language);
      if (languageS) {
        this.speech.setLanguage(languageS.speakCode);
        try {
          if (languageS.speakCode === "zh-CN") {
            this.speech.setVoice("Google 普通话（中国大陆）");
          }
          if (languageS.speakCode === "en-US") {
            this.speech.setVoice("Google US English");
          }
        } catch {
          // skip
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

  onTermClick = (term, index) => {
    this.speech.speak({ text: term.content, queue: false });
    const { setBookmark, id } = this.props;
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
        <TermEditForm />
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
    setBookmark: setBookmarkAction
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
  language: PropTypes.number,
  title: PropTypes.string,
  id: PropTypes.string,
  terms: PropTypes.arrayOf(PropTypes.shape({})),
  bookmark: PropTypes.number
};
