import React, { useState } from "react";
import axios from "axios";
import ConfirmDialog from "./ConfirmDialog";

const WordSave = ({ word }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const saveWordToDatabase = async () => {
    const cleanedWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    try {
      await axios.post("/api/save-word", { word: cleanedWord });
      console.log("저장된 단어:", cleanedWord);
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving word:", error);
    }
  };

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
      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={saveWordToDatabase}
        word={word}
      />
    </>
  );
};

export default WordSave;
