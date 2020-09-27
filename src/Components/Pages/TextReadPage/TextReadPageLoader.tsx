import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { RootState } from "../../../RootReducer";
import TextReadPage from "./TextReadPage";
import { ReadingTextState } from "../../../Reducers/TextReducer";
import { readTextAction } from "../../../Actions/TextAction";

interface TextReadPageParams {
  textId: string;
}

interface TextReadPageLoaderProps
  extends RouteComponentProps<TextReadPageParams, any, any> {
  readText: Function;
  text: ReadingTextState | null;
}

class TextReadPageLoader extends React.Component<TextReadPageLoaderProps, any> {
  componentDidMount() {
    const {
      readText,
      match: {
        params: { textId },
      },
    } = this.props;
    readText(textId);
  }

  render() {
    const { text } = this.props;
    if (!text) {
      return <h1>Loading</h1>;
    }
    return <TextReadPage />;
  }
}

export default connect(
  (state: RootState) => ({
    text: state.text.readingText,
  }),
  {
    readText: readTextAction,
  }
)(TextReadPageLoader);
