import { Box, Typography } from "@mui/material";
import React from "react";

const Description = () => {
  return (
    <Box
      bgcolor="#f1f3f5"
      padding={2}
      marginBottom={2}
      style={{ flex: 1 }}
      height="100%"
    >
      <Typography>관용어구, 문법 설명 칸</Typography>
    </Box>
  );
};

export default Description;
