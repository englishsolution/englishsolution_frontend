import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import { fetchQuizData } from "../../../api/quizApi";

const QuizTemplate = ({ videoId, quizType }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quizData, setQuizData] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuizData = async () => {
      const data = await fetchQuizData(videoId, quizType);
      setQuizData(data.questions);
    };
    loadQuizData();
  }, [videoId, quizType]);

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
    navigate("/learning/quiz-result", {
      state: {
        quizType,
        quizData,
        selectedOptions,
      },
    });
  };

  if (showResults) {
    return null;
  }

  if (!quizData.length) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const selectedOption = selectedOptions[currentQuestionIndex];

  return (
    <div className="quiz-box">
      <h2>
        {quizType === "word"
          ? "아래 단어의 뜻은?"
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
