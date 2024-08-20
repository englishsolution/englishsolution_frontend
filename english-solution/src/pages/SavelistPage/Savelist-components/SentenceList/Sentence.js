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

  const formattedDate = new Date(sentence.save_date).toLocaleDateString(
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div>
      <div className="sentence" onClick={handleClickOpen}>
        <span className="sentence-date">{formattedDate}</span>
        <span className="sentence-text">{sentence.sentence_eg}</span>
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
