import React from "react";
import { TextItem } from "../../../Reducers/TextReducer";

function TextProgress(props: { text: TextItem }) {
  const { text } = props;
  let percentage = 0;
  if (text.termCount === 0) {
    return <span>-</span>;
  }
  if (text.bookmark && text.bookmark !== 0) {
    percentage = Math.floor((text.bookmark / text.termCount) * 10000) / 100;
  }
  return <span>{`${percentage}%`}</span>;
}

export default TextProgress;
