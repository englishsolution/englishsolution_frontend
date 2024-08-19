import React, { useState } from "react";
import axios from "axios";
import WordConfirm from "../../../../components/ConfirmDialog/WordConfirm";

const WordSave = ({ word, videoId }) => {
  const [openDialog, setOpenDialog] = useState(false);

  // 다이얼로그 열기
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // 다이얼로그 닫기
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // 단어를 데이터베이스에 저장
  const saveWordToDatabase = async () => {
    const cleanedWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();

    try {
      await axios.post("/api/save-word", {
        word: cleanedWord,
        save_date: new Date().toISOString(),
        video: videoId,
      });
      console.log("저장된 단어:", cleanedWord);
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving word:", error);
      alert("Failed to save word. Please try again.");
    }
  };

  // 단어 클릭 핸들러
  const handleWordClick = () => {
    handleOpenDialog();
  };

  return (
    <>
      <span
        style={{
          cursor: "pointer",
          marginRight: "10px",
        }}
        onClick={handleWordClick}
      >
        {word}
      </span>
      <WordConfirm
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={saveWordToDatabase}
        word={word}
      />
    </>
  );
};

export default WordSave;
