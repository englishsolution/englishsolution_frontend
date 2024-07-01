import React from "react";
import axios from "axios";

const WordSave = ({ word }) => {
  const saveWordToDatabase = async () => {
    try {
      await axios.post("/api/save-word", { word });
      console.log("저장된 단어:", word);
    } catch (error) {
      console.error("Error saving word:", error);
    }
  };

  const handleWordClick = () => {
    saveWordToDatabase();
  };

  return (
    <span
      style={{
        cursor: "pointer",
        marginRight: "10px",
      }}
      onClick={handleWordClick}
    >
      {word}
    </span>
  );
};

export default WordSave;
