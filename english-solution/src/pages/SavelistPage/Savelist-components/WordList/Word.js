import React from "react";
import { Box } from "@mui/material";

const Word = ({ word }) => {
  return (
    <Box className="word">
      <span className="word-text">{word.word_eg}</span>
      <span>{word.word_kr}</span>
    </Box>
  );
};

export default Word;
