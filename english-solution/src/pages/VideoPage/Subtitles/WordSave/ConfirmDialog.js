// ConfirmDialog.js
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const ConfirmDialog = ({ open, onClose, onConfirm, word }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>단어 저장 확인</DialogTitle>
      <DialogContent>
        <DialogContentText>"{word}"를 저장하시겠습니까?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          취소
        </Button>
        <Button onClick={handleConfirm} color="primary">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
