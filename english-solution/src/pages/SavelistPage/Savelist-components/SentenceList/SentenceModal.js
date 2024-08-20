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
    borderRadius: "12px",
    padding: "16px",
    boxShadow: theme.shadows[8],
    backgroundColor: "#ffffff",
  },
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  borderRadius: "12px 12px 0 0",
  padding: "16px",
  fontWeight: 600,
}));

const Content = styled(DialogContent)(({ theme }) => ({
  padding: "16px",
  height: "500px",
  color: theme.palette.text.primary,
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const SentenceModal = ({ open, handleClose, sentence }) => {
  return (
    <CustomDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <CustomDialogTitle>문장 분석</CustomDialogTitle>
      <Content>
        <Typography variant="body1" gutterBottom>
          <strong>저장한 날짜:</strong> {sentence.save_date}
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
