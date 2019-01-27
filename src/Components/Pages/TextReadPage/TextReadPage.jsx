import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import Speech from "speak-tts";
import { readTextAction } from "../../../Actions/TextAction";
import styles from "./TextReadPage.module.scss";
import TermEditForm from "../../Forms/TermEditForm";
import {
  getTermAction,
  setEditingTermAction
} from "../../../Actions/TermAction";
import Term from "../../Term";

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
    return readingText ? (
      <Row>
        <Col md={16} className={styles.contentPanel}>
          <h2 className={styles.titleSection}>{readingText.title}</h2>
          <div
            className={`${styles.textReadContainer} ${
              editingTerm ? styles.editing : ""
            }`}
          >
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
        </Col>
        {editingTerm ? (
          <Col md={8} className={styles.termEditSection}>
            <TermEditForm />
          </Col>
        ) : null}
      </Row>
    ) : null;
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
