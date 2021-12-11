import React from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router";
import { TextItem } from "../../../Reducers/TextReducer";

function TextProgress(props: { text: TextItem }) {
  const { text } = props;
  const history = useHistory();
  let percentage = 0;
  if (text.termCount === 0) {
    return <span>-</span>;
  }
  if (text.bookmark && text.bookmark !== 0) {
    percentage = Math.floor((text.bookmark / text.termCount) * 10000) / 100;
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>{`${percentage}%`}</div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push(`/text/read/${text.id}`)}
      >
        Read
      </Button>
    </div>
  );
}

export default TextProgress;
