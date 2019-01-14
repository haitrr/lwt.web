import React from "react";
import { connect } from "react-redux";
import { readTextAction } from "../../../Actions/TextAction";
import SplitPane from "react-split-pane";
import "./TextReadPage.css";
import TermEditForm from "../../Forms/TermEditForm/TermEditForm";
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
    const { readText } = this.props;
    readText(this.props.match.params.textId);
  }

  render() {
    const { readingText, editingTerm } = this.props;
    return readingText ? (
      <div className="readPane">
        <SplitPane split="vertical" defaultSize="40vw">
          <div>
            <SplitPane split="horizontal" defaultSize="10vh">
              <div>{readingText.title}</div>
              <div className="text-read-container">
                {readingText.terms.map((term, index) => {
                  return <Term term={term} index={index} />;
                })}
              </div>
            </SplitPane>
          </div>
          <SplitPane split="horizontal" defaultSize="40vh">
            <div>{editingTerm ? <TermEditForm /> : <div />}</div>
            <div>The dictionary should be here</div>
          </SplitPane>
        </SplitPane>
      </div>
    ) : null;
  }
}

const connectedTextPage = connect(
  state => {
    return {
      readingText: state.text.readingText,
      editingTerm: state.term.editingTerm
    };
  },
  {
    readText: readTextAction,
    getTerm: getTermAction,
    setEditingTerm: setEditingTermAction
  }
)(TextReadPage);

export { connectedTextPage as TextReadPage };
