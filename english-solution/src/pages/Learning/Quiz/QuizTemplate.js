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
      try {
        const data = await fetchQuizData(videoId, quizType);
        setQuizData(data);
      } catch (error) {
        console.error("퀴즈 데이터 로딩 오류:", error);
      }
    };
    loadQuizData();
  }, [videoId, quizType]);

  // 옵션 클릭 시 처리 함수
  const handleOptionClick = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: option,
    });
  };

  // 이전 문제 버튼 클릭 시 처리 함수
  const handlePreviousClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  // 다음 문제 버튼 클릭 시 처리 함수
  const handleNextClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  // 제출 버튼 클릭 시 처리 함수
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

  // 결과가 이미 보여지는 경우 아무것도 렌더링하지 않음
  if (showResults) {
    return null;
  }

  // 퀴즈 데이터가 로딩 중인 경우 로딩 메시지 표시
  if (!quizData.length) {
    return <div>Loading...</div>;
  }

  // 현재 문제 및 선택된 옵션 가져오기
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
