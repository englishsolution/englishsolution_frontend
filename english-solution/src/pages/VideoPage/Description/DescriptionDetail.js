import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const BoxComponent = ({ title, items }) => {
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

      <List
        sx={{
          paddingLeft: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          listStyleType: "none",
        }}
      >
        {items.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              width: "100%",
              padding: "0px",
              marginBottom: "5px",
            }}
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BoxComponent;
