// 스피킹 테스트 페이지 (모달)

import React from "react";
import Button from "@mui/material/Button"; // MUI Button import
import Modal from "@mui/material/Modal"; // MUI Modal import

const SpeakingModal = ({ open, handleClose, subtitle }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 id="modal-subtitle">문장: {subtitle.text}</h2>
        <p id="modal-description">speaking 발음 채점 API 활용</p>
        <p id="modal-score">점수: 90점</p>
        <Button onClick={handleClose}>닫기</Button>
      </div>
    </Modal>
  );
};

export default SpeakingModal;
