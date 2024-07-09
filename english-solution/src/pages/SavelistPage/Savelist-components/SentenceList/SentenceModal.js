import React from "react";
import { Modal, Typography, Button } from "@mui/material";

const SentenceModal = ({ open, handleClose, sentence }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          height: 500,
          backgroundColor: "white",
          boxShadow: 24,
          padding: 16,
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {sentence.text}
        </Typography>
        <Button onClick={handleClose}>닫기</Button>
      </div>
    </Modal>
  );
};

export default SentenceModal;
