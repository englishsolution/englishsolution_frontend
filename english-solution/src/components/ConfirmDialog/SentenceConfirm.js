import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

/**
 * 자막 저장을 확인하는 Modal 컴포넌트
 * @param {Object} props - 컴포넌트의 속성
 * @param {boolean} props.open - Modal 열림 상태
 * @param {Function} props.onClose - Modal 닫기 함수
 * @param {Function} props.onConfirm - 저장 확인 함수
 * @param {Object} props.subtitle - 자막 정보
 */
const SentenceConfirm = ({ open, onClose, onConfirm, subtitle }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>자막 저장 확인</DialogTitle>
      <DialogContent>
        <p>자막을 저장하시겠습니까?</p>
        <p>{subtitle.englishSubtitle}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={onConfirm} color="primary">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SentenceConfirm;
