// src/Savelist-components/SentenceModal.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const SentenceModal = ({ open, handleClose, sentence }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        className: "custom-dialog",
      }}
      maxWidth="md" // 모달의 최대 너비를 설정합니다.
      fullWidth // 모달이 전체 너비를 사용하도록 설정합니다.
    >
      <DialogTitle>문장 분석</DialogTitle>
      <DialogContent>
        <p>
          <strong>저장한 날짜: </strong> {sentence.date}
        </p>
        <p>
          <strong>English: </strong> {sentence.text}
        </p>
        <p>한글 번역, 문법, 관용어구, 단어 등등 ...</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SentenceModal;
