import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import SentenceConfirm from "../../../../components/ConfirmDialog/SentenceConfirm";

const SentenceSave = ({ sentence, videoId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const saveSentenceToDatabase = async () => {
    const videoLink = `https://www.youtube.com/watch?v=${videoId}`;

    try {
      const response = await axios.post(
        "/save",
        {
          category: "sentence",
          sentence: sentence,
          video_link: "www",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "sentence saved successfully") {
        console.log("Sentence saved successfully.");
        setIsSaved(true); // 저장 완료 상태로 업데이트
        handleCloseDialog(); // 저장 후 다이얼로그 닫기
      }
    } catch (error) {
      console.error("Error saving sentence:", error);
      alert("Failed to save sentence. Please try again.");
      handleCloseDialog();
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpenDialog}
        disabled={isSaved}
        style={{
          cursor: isSaved ? "default" : "pointer",
          marginRight: "10px",
        }}
        aria-disabled={isSaved}
      >
        {isSaved ? "Saved" : "Save Sentence"}
      </Button>
      <SentenceConfirm
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={saveSentenceToDatabase}
        subtitle={{ englishSubtitle: sentence }}
      />
    </>
  );
};

export default SentenceSave;
