// src/components/SubtitleActions.js
import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import SpeakingModal from "../../SpeakingModal/SpeakingModal";

const SubtitleActions = ({ subtitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sentenceSave = async () => {
    await axios.post("/api/save-subtitle", { subtitle });
    console.log("Save subtitle:", subtitle);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <span className="subtitle-actions">
      <Button variant="outlined" onClick={sentenceSave}>
        ⭐
      </Button>
      <Button variant="outlined" onClick={openModal}>
        🎤
      </Button>
      <SpeakingModal
        open={isOpen}
        handleClose={closeModal}
        subtitle={subtitle}
      />
    </span>
  );
};

export default SubtitleActions;
