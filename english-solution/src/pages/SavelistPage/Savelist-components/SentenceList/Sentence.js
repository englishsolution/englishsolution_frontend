import React from "react";
import { Box } from "@mui/material";

const Sentence = ({ sentence }) => {
  return (
    <Box className="sentence">
      <span>{sentence.date}</span>
      <span> ----- </span>
      <span>{sentence.text}</span>
    </Box>
  );
};

export default Sentence;
