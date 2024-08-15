import React from "react";

const QuizQuestion = ({ questionData, selectedOption, handleOptionClick }) => {
  const { word, sentence, options } = questionData;
  const questionText = word ? `What is the meaning of "${word}"?` : sentence;

  return (
    <div className="quiz-question">
      <p>{questionText}</p>
      <div className="options">
        {options.map((option, index) => {
          const isSelected = selectedOption === option;
          return (
            <div
              key={index}
              className={`option ${isSelected ? "selected" : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;
