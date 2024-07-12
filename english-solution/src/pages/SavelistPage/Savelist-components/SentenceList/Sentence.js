import React, { useState } from "react";
import SentenceModal from "./SentenceModal";

const Sentence = ({ sentence }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="sentence" onClick={handleClickOpen}>
        <span className="sentence-date">{sentence.date}</span>
        <span className="sentence-text">{sentence.text}</span>
      </div>
      <SentenceModal
        open={open}
        handleClose={handleClose}
        sentence={sentence}
      />
    </div>
  );
};

export default Sentence;
