import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Speech from "speak-tts";
import { Tooltip } from "antd";
import { animateScroll } from "react-scroll";
import { readTextAction, setBookmarkAction } from "../../../Actions/TextAction";
import styles from "./TextReadPage.module.scss";
import TermEditForm from "../../Forms/TermEditForm";
import {
  getTermAction,
  setEditingTermAction
} from "../../../Actions/TermAction";
import Term from "../../Term";
import { TermLearningColor, TermLearningLevel } from "../../../Enums";
import SingleBarChart from "../../SingleBarChart";

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

  componentDidUpdate(prevProps) {
    const { readingText, languages } = this.props;
    if (
      readingText &&
      (prevProps.languages !== languages ||
        prevProps.readingText !== readingText)
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
        this.bookmark.current.offsetTop -
          this.bookmark.current.parentNode.offsetTop,
        {
          containerId: "contentPanel",
          smooth: true
        }
      );
    }
  }

  onTermClick = (term, index) => {
    this.speech.speak({ text: term.content });
    const { setBookmark, readingText } = this.props;
    setBookmark(readingText.id, index);
  };

  render() {
    const { readingText, editingTerm } = this.props;
    if (!readingText) {
      return null;
    }

    // todo: optimize
    const statistic = [];
    Object.keys(TermLearningLevel).forEach(learningLevel => {
      if (
        learningLevel === "Skipped" ||
        learningLevel === "Ignored" ||
        learningLevel === "WellKnow"
      )
        return;
      statistic.push({
        name: learningLevel,
        value: readingText.terms.filter(
          t => t.learningLevel === TermLearningLevel[learningLevel]
        ).length,
        color: TermLearningColor[learningLevel]
      });
    });

    const practice = statistic.map(i => i.value).reduce((a, b) => a + b);
    const total = readingText.terms.filter(
      t => t.learningLevel !== TermLearningLevel.Skipped
    ).length;

    return (
      <div className={styles.readPane}>
        <div>
          <h2 className={styles.titleSection}>{readingText.title}</h2>
        </div>
        <Tooltip
          title={`${practice}/${total} ~ ${Math.round(
            (practice * 100) / total
          )} %`}
        >
          <span>{}</span>
          <SingleBarChart data={statistic} />
        </Tooltip>
        <div id="contentPanel" className={styles.contentPanel}>
          {readingText.terms.map((term, index) => {
            if (term.learningLevel === TermLearningLevel.Skipped) {
              return term.content;
            }
            if (index === readingText.bookmark) {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <span key={index} ref={this.bookmark}>
                  <Term
                    onTermClick={t => this.onTermClick(t, index)}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    term={term}
                  />
                </span>
              );
            }
            return (
              <Term
                onTermClick={t => this.onTermClick(t, index)}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                term={term}
                index={index}
              />
            );
          })}
        </div>
        {editingTerm ? (
          <div>
            <TermEditForm />
          </div>
        ) : null}
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
  editingTerm: null,
  readingText: null
};

TextReadPage.propTypes = {
  editingTerm: PropTypes.shape(),
  match: PropTypes.shape().isRequired,
  readText: PropTypes.func.isRequired,
  readingText: PropTypes.shape(),
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setBookmark: PropTypes.func.isRequired
};
