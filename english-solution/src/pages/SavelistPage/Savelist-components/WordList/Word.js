import React from "react";
import { Box } from "@mui/material";

const Word = ({ word }) => {
  const formattedDate = new Date(word.save_date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box className="word">
      <span className="word-text">{word.word_eg}</span>
      <span>{word.word_kr}</span>
      <span style={{ fontSize: "10px" }}>{formattedDate}</span>
    </Box>
  );
};

export default Word;
