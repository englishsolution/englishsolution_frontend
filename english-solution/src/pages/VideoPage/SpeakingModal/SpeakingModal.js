// 스피킹 테스트 페이지 (모달)

import React from "react";
import Button from "@mui/material/Button"; // MUI Button import
import Modal from "@mui/material/Modal"; // MUI Modal import
import { Box } from "@mui/material";

const SpeakingModal = ({ open, handleClose, subtitle }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          height: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 id="modal-subtitle">{subtitle.text}</h2>
        <p id="modal-description">speaking 발음 채점 API 활용</p>
        <p id="modal-score">점수: 90점 (예시)</p>
        <Button onClick={handleClose}>닫기</Button>
      </Box>
    </Modal>
  );
};

export default SpeakingModal;
