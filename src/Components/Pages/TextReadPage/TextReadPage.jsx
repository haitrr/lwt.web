import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import SplitPane from "react-split-pane";
import { readTextAction } from "../../../Actions/TextAction";
import "./TextReadPage.css";
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
  }

  render() {
    const { readingText, editingTerm } = this.props;
    return readingText ? (
      <div className="readPane">
        <SplitPane split="vertical" defaultSize="60vw">
          <div>
            <SplitPane
              split="horizontal"
              pane2Style={{ height: "74vh" }}
              defaultSize="10vh"
            >
              <h2>{readingText.title}</h2>
              <div className="text-read-container">
                {readingText.terms.map((term, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Term key={index} term={term} index={index} />
                ))}
              </div>
            </SplitPane>
          </div>
          <div>{editingTerm ? <TermEditForm /> : <div />}</div>
        </SplitPane>
      </div>
    ) : null;
  }
}

export default connect(
  state => ({
    readingText: state.text.readingText,
    editingTerm: state.term.editingTerm
  }),
  {
    readText: readTextAction,
    getTerm: getTermAction,
    setEditingTerm: setEditingTermAction
  }
)(TextReadPage);

TextReadPage.propTypes = {
  editingTerm: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  readText: PropTypes.func.isRequired,
  readingText: PropTypes.shape().isRequired
};
