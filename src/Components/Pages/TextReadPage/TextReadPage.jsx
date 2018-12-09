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

/**
 * text read page.
 */
class TextReadPage extends React.Component {
  componentDidMount() {
    const { readText } = this.props;
    readText(this.props.match.params.textId);
  }

  handleTermClick = term => {
    const { getTerm, setEditingTerm } = this.props;
    if (term.id) {
      getTerm(term.id);
    } else {
      setEditingTerm(term);
    }
  };

  render() {
    const { readingText, editingTerm } = this.props;
    return readingText ? (
      <div className="readPane">
        <SplitPane split="vertical" defaultSize="50%">
          <div>
            <SplitPane split="horizontal">
              <div>{readingText.title}</div>
              <div>
                {readingText.terms.map((term, index) => (
                  <span
                    className={`term term-${term.learningLevel}`}
                    key={index}
                    onClick={() => this.handleTermClick(term)}
                  >
                    {term.content}
                  </span>
                ))}
              </div>
            </SplitPane>
          </div>
          <SplitPane split="horizontal" defaultSize="50%">
            {editingTerm ? <TermEditForm value={editingTerm} /> : <div />}
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
