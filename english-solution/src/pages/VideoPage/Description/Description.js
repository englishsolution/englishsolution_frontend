import { Box, Typography } from "@mui/material";
import React from "react";
import ChatbotButton from "../ChatbotButton/ChatbotButton";

const Description = () => {
  return (
    <Box
      bgcolor="#f1f3f5"
      padding={2}
      marginBottom={2}
      style={{ flex: 1, position: "relative" }}
    >
      <Typography>관용어구, 문법 설명 칸</Typography>
      <Box
        style={{
          position: "fixed",
          bottom: "70px",
          right: "70px",
          width: "150px",
          height: "50px",
          zIndex: 1000,
        }}
      >
        <ChatbotButton />
      </Box>
    </Box>
  );
};

export default Description;
