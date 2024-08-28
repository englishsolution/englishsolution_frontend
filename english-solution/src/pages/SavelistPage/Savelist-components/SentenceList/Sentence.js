import React, { useState } from "react";
import SentenceModal from "./SentenceModal";

const Sentence = ({ sentence }) => {
  const [open, setOpen] = useState(false);

  const formattedDate = new Date(sentence.save_date).toLocaleDateString(
    "ko-KR",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="sentence" onClick={handleClickOpen}>
        <span
          style={{
            fontSize: "12px",
            color: "#888",
            marginTop: "4px",
          }}
          className="sentence-date"
        >
          {formattedDate}
        </span>
        <span
          style={{
            fontSize: "18px",
            fontWeight: 500,
            color: "#333",
          }}
          className="sentence-text"
        >
          {sentence.sentence_eg}
        </span>
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
