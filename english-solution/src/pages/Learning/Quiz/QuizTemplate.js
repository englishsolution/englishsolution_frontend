import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import QuizDataLoader from "./QuizDataLoader";

const QuizTemplate = () => {
  const { quizType, videoId } = useParams(); // URL 파라미터 가져오기
  const location = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quizData, setQuizData] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { title } = location.state || {};
  console.log(title);

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
        quizId,
      },
    });
  };

  const handleDataLoaded = (data, quizId) => {
    setQuizData(data);
    setQuizId(quizId);
  };

  const handleError = (error) => {
    setError(error);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!quizData.length && !showResults) {
    return (
      <div>
        <QuizDataLoader onDataLoaded={handleDataLoaded} onError={handleError} />
      </div>
    );
  }

  if (showResults) {
    return null;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const selectedOption = selectedOptions[currentQuestionIndex];

  console.log(quizData);

  return (
    <div className="quiz-page">
      <h3>{title}</h3>
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
    </div>
  );
};

export default QuizTemplate;
