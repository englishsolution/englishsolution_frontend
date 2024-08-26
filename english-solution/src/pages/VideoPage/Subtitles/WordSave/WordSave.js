import React, { useState } from "react";
import axios from "axios";
import WordConfirm from "../../../../components/ConfirmDialog/WordConfirm";

const WordSave = ({ word, videoId }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

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

  const spanStyle = {
    cursor: "pointer",
    marginRight: "2px",
    padding: "2px 4px",
    borderRadius: "4px",
    backgroundColor: isHovered ? "#007bff" : "transparent",
    color: isHovered ? "#fff" : "#000",
    transition: "background-color 0.3s, color 0.3s",
  };

  return (
    <>
      <span
        style={spanStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
