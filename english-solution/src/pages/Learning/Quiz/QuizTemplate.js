import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import QuizDataLoader from "./QuizDataLoader";

const QuizTemplate = () => {
  const { quizType, videoId } = useParams(); // URL 파라미터 가져오기
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quizData, setQuizData] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: option,
    });
  };

  const handlePreviousClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowResults(true);
    navigate(`/learning/Quiz/${quizType}/${videoId}/quiz-result`, {
      state: {
        quizType,
        quizData,
        selectedOptions,
      },
    });
  };

  if (!quizData.length) {
    return (
      <div>
        <QuizDataLoader onDataLoaded={setQuizData} />
        Loading... 퀴즈데이터 없음
      </div>
    );
  }

  if (showResults) {
    return null;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const selectedOption = selectedOptions[currentQuestionIndex];

  return (
    <div className="quiz-box">
      <h2>
        {quizType === "word"
          ? "아래 단어의 뜻은?"
          : quizType === "replay"
            ? "퀴즈를 다시 풀어보세요"
            : "아래 문장의 빈칸에 들어갈 단어는?"}
      </h2>
      <QuizQuestion
        questionData={currentQuestion}
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
      />
      <div className="navigation-buttons">
        <button
          onClick={handlePreviousClick}
          disabled={currentQuestionIndex === 0}
        >
          이전 문제
        </button>
        <button
          onClick={handleNextClick}
          disabled={currentQuestionIndex === quizData.length - 1}
        >
          다음 문제
        </button>

        {currentQuestionIndex === quizData.length - 1 && (
          <form onSubmit={handleSubmit}>
            <button type="submit" className="submit-button">
              제출
            </button>
          </form>
        )}
      </div>
      <div>
        {currentQuestionIndex + 1} / {quizData.length}
      </div>
    </div>
  );
};

export default QuizTemplate;
