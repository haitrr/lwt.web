import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Speech from "speak-tts";
import { Tooltip } from "antd";
import { readTextAction } from "../../../Actions/TextAction";
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
      }
    }
  }

  onTermClick = term => {
    this.speech.speak({ text: term.content });
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
        <div className={styles.contentPanel}>
          <div>
            {readingText.terms.map((term, index) => (
              <Term
                onTermClick={this.onTermClick}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                term={term}
                index={index}
              />
            ))}
          </div>
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
    setEditingTerm: setEditingTermAction
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
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
