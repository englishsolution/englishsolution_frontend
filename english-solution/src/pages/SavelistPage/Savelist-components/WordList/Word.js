import React from "react";
import { Box } from "@mui/material";

const Word = ({ word }) => {
  return (
    <Box className="word">
      <span className="word-text">{word.english}</span>
      <span>{word.korean}</span>
    </Box>
  );
};

export default Word;
