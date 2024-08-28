import React from "react";
import "./QuizTemplate.css";

const QuizQuestion = ({ questionData, selectedOption, handleOptionClick }) => {
  const { word, sentence, options } = questionData;
  const questionText = word ? `What is the meaning of "${word}"?` : sentence;

  // 클릭 시 선택 토글
  const handleClick = (option) => {
    if (selectedOption === option) {
      // 이미 선택된 옵션을 클릭하면 선택 해제
      handleOptionClick(null);
    } else {
      // 새로운 옵션을 선택
      handleOptionClick(option);
    }
  };

  return (
    <div className="quiz-question">
      <p className="questionText">{questionText}</p>
      <div className="options">
        {options.map((option, index) => {
          const isSelected = selectedOption === option;
          return (
            <div
              key={index}
              className={`option ${isSelected ? "selected" : ""}`}
              onClick={() => handleClick(option)}
              role="button"
              tabIndex={0}
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
