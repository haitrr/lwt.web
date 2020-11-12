import { Button } from "antd";
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
        type="primary"
        onClick={better}
        disabled={term.meaning === null || loading}
      >
        Better
      </Button>
      <Button
        type="primary"
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
