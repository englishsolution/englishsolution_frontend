import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import SentenceSave from "../Subtitles/SentenceSave/SentenceSave";

const AllScript_SentenceBox = ({ sentence, videoId }) => {
  return (
    <Box
      display="flex"
      padding="10px"
      marginBottom="8px"
      style={{
        backgroundColor: "#f7f7f7",
        borderRadius: "4px",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="body2" style={{ flexGrow: 1 }}>
        {sentence}
      </Typography>
      <SentenceSave sentence={sentence} videoId={videoId} />
    </Box>
  );
};

export default AllScript_SentenceBox;
