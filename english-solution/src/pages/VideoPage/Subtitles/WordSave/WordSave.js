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
    const cleanedWord = word.replace(/[.,/#!$%&;:{}=\-_`~()]/g, "").trim();

    const videoLink = `https://www.youtube.com/watch?v=${videoId}`;

    // 요청 데이터 로그 출력
    console.log("Sending request with data:", {
      category: "word",
      word: cleanedWord,
      video_link: "www",
    });

    try {
      const response = await axios.post(
        "/save",
        {
          category: "word",
          word: cleanedWord,
          video_link: "www", // 실제 비디오링크로 수정 필요 -> video_link
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Word saved successfully") {
        console.log("저장된 단어:", cleanedWord);
        handleCloseDialog();
      }
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
