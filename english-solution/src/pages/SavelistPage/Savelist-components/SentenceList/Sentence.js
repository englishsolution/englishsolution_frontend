import React, { useState } from "react";
import SentenceModal from "./SentenceModal";

const Sentence = ({ sentence }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="sentence" onClick={openModal}>
      <span className="sentence-date">{sentence.date}</span>
      <span className="sentence-text">{sentence.text}</span>
      <SentenceModal
        open={isOpen}
        handleClose={closeModal}
        sentence={sentence}
      />
    </div>
  );
};

export default Sentence;
