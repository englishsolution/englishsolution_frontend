import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  styled,
} from "@mui/material";
import Description from "../../../VideoPage/Description/Description";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "16px", // Border radius를 더 둥글게 변경
    padding: "20px", // Padding을 늘려서 더 여유있는 레이아웃으로 변경
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)", // 그림자 효과를 더 부드럽게
    backgroundColor: "#f9f9f9", // 배경 색상을 약간 더 밝게
  },
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: "#1976d2", // 기본 MUI primary 색상 사용
  color: "#ffffff",
  borderRadius: "12px 12px 0 0", // 상단 모서리만 둥글게
  padding: "16px",
  fontWeight: 600,
  textAlign: "center", // 제목을 중앙 정렬
  fontSize: "20px", // 제목의 크기 약간 키움
}));

const Content = styled(DialogContent)(({ theme }) => ({
  padding: "24px", // Padding을 조금 더 키움
  height: "auto", // Height를 자동으로 조정
  color: theme.palette.text.primary,
  backgroundColor: "#ffffff", // Content 영역의 배경색을 흰색으로
  borderRadius: "0 0 12px 12px", // 하단 모서리만 둥글게
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1976d2",
  color: "#ffffff",
  borderRadius: "8px",
  padding: "10px 20px",
  fontSize: "16px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#1565c0", // hover시 색상을 약간 더 어둡게
  },
}));

const SentenceModal = ({ open, handleClose, sentence }) => {
  return (
    <CustomDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <CustomDialogTitle>문장 분석</CustomDialogTitle>
      <Content>
        <Typography variant="body1" sx={{ marginTop: "10px" }} gutterBottom>
          <strong>저장한 날짜:</strong>{" "}
          {new Date(sentence.save_date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" gutterBottom>
          <strong>English:</strong> {sentence.sentence_eg}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>한국어:</strong> {sentence.sentence_kr}
        </Typography>
        {/* Pass sentence.sentence_eg to Description component */}
        <Description sentence={sentence.sentence_eg} />
      </Content>
      <DialogActions sx={{ padding: "16px", justifyContent: "center" }}>
        <CustomButton onClick={handleClose}>닫기</CustomButton>
      </DialogActions>
    </CustomDialog>
  );
};

export default SentenceModal;
