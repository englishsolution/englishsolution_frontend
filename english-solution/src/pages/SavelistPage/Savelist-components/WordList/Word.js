import React from "react";
import { Box } from "@mui/material";

const Word = ({ word }) => {
  return (
    <Box className="word">
      <span>{word.english}</span>
    </Box>
  );
};

export default Word;
