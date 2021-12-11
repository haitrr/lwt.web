import { Box, Paper } from "@mui/material";
import React from "react";
import Title from "./Title";
import Content from "./Content";
import { Term } from "../../../Reducers/TextReducer";

interface Props {
  onMouseLeave: () => void;
  onMouseEnter: () => void;
  term: Term;
  better: () => void;
  worse: () => void;
  loading: boolean;
}

const PopoverBody: React.FC<Props> = ({
  onMouseLeave,
  onMouseEnter,
  term,
  better,
  worse,
  loading,
}) => {
  return (
    <Box
      p={2}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ maxWidth: "30vw" }}
    >
      <Paper style={{ padding: "1rem" }}>
        <Title term={term} />
        <Content term={term} loading={loading} better={better} worse={worse} />
      </Paper>
    </Box>
  );
};

export default PopoverBody;
