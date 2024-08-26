import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const BoxComponent = ({ title, items, columns = 1 }) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        marginBottom: "20px",
        width: "80%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>

      <hr
        style={{
          width: "100%",
          border: "none",
          borderBottom: "1px solid #ccc",
        }}
      />

      <Box
        display="grid"
        gridTemplateColumns={`repeat(${columns}, 1fr)`}
        gap={2}
      >
        {items.map((item, index) => (
          <Box key={index} padding={1}>
            {item}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BoxComponent;
