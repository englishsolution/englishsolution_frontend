import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import SentenceConfirm from "../../../../components/ConfirmDialog/SentenceConfirm";

const SentenceSave = ({ sentence, videoId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(false);
  }, [sentence]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const saveSentenceToDatabase = async () => {
    const videoLink = `https://www.youtube.com/watch?v=${videoId}`;

    console.log(sentence, videoLink);

    try {
      const response = await axios.post(
        "/save",
        {
          category: "sentence",
          sentence: sentence,
          video_link: videoLink,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "sentence saved successfully") {
        console.log("저장된 문장:", sentence);
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
        sx={{
          cursor: isSaved ? "default" : "pointer",
          marginRight: "10px",
          maxWidth: "40px",
          maxHeight: "40px",
          minWidth: "unset",
          fontSize: "20px",
          border: "none",
        }}
        aria-disabled={isSaved}
      >
        {isSaved ? "" : "⭐"}
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
