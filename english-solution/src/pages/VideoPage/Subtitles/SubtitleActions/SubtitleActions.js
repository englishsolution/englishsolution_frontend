// src/components/SubtitleActions.js
import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import SpeakingModal from "../../SpeakingModal/SpeakingModal";

const SubtitleActions = ({ subtitle }) => {
  const [openModal, setOpenModal] = useState(false);

  const sentenceSave = async () => {
    await axios.post("/api/save-subtitle", { subtitle });
    console.log("Save subtitle:", subtitle);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <span className="subtitle-actions">
      <Button variant="outlined" onClick={sentenceSave}>
        ⭐
      </Button>
      <Button variant="outlined" onClick={handleOpenModal}>
        🎤
      </Button>
      <SpeakingModal
        open={openModal}
        handleClose={handleCloseModal}
        subtitle={subtitle}
      />
    </span>
  );
};

export default SubtitleActions;
