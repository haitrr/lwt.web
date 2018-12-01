import * as React from "react";
import { connect } from "react-redux";
import { readTextAction } from "../../../Actions/TextAction";

/**
 * text read page.
 */
class TextReadPage extends React.Component<any> {
  public componentDidMount(): void {
    const { readText } = this.props;
    readText(this.props.match.params.textId);
  }

  public render(): React.ReactNode {
    const { readingText } = this.props;

    return readingText ? (
      <div>
        <div>{readingText.title}</div>
        <hr />
        {readingText.terms.map((term: any, index: number) => (
          <span key={index}>{term.content}</span>
        ))}
      </div>
    ) : null;
  }
}

const connectedTextPage: any = connect(
  (state: any) => {
    return { readingText: state.text.readingText };
  },
  { readText: readTextAction }
)(TextReadPage);

export { connectedTextPage as TextReadPage };
