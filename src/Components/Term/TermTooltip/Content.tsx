import { Button } from "@mui/material";
import React from "react";
import { Term } from "../../../Reducers/TextReducer";

interface Props {
  term: Term;
  loading: boolean;
  better: () => void;
  worse: () => void;
}

const Content: React.FC<Props> = ({ term, loading, better, worse }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={better}
        disabled={term.meaning === null || loading}
      >
        Better
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: "5px" }}
        onClick={worse}
        disabled={term.meaning === null || loading}
      >
        Worse
      </Button>
    </div>
  );
};

export default Content;
