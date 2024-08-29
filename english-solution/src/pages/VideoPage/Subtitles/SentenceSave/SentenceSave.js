import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import SentenceConfirm from "../../../../components/ConfirmDialog/SentenceConfirm";

const SentenceSave = ({ sentence, videoId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSentence, setCurrentSentence] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState("");

  useEffect(() => {
    if (openDialog) {
      console.log(
        "Dialog opened with sentence:",
        currentSentence,
        "and video ID:",
        currentVideoId
      );
    }
  }, [currentSentence, currentVideoId, openDialog]);

  useEffect(() => {
    // 다이얼로그가 열린 직후 상태를 콘솔에 출력
    if (openDialog) {
      console.log("State updated:", currentSentence, currentVideoId);
    }
  }, [currentSentence, currentVideoId]);

  const handleOpenDialog = () => {
    setCurrentSentence(sentence);
    setCurrentVideoId(videoId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const saveSentenceToDatabase = async () => {
    const videoLink = `https://www.youtube.com/watch?v=${currentVideoId}`;

    console.log(
      "Saving sentence:",
      currentSentence,
      "with video link:",
      videoLink
    );

    try {
      const response = await axios.post(
        "/save",
        {
          category: "sentence",
          sentence: currentSentence,
          video_link: videoLink,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "sentence saved successfully") {
        console.log("저장된 문장:", currentSentence);
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
        sx={{
          cursor: "pointer",
          marginRight: "10px",
          maxWidth: "40px",
          maxHeight: "40px",
          minWidth: "unset",
          fontSize: "20px",
          border: "none",
        }}
      >
        ⭐
      </Button>
      <SentenceConfirm
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={saveSentenceToDatabase}
        subtitle={{ englishSubtitle: currentSentence }}
      />
    </>
  );
};

export default SentenceSave;
