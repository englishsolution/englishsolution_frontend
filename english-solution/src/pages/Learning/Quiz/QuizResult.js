import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./QuizResult.css";

const QuizResult = () => {
  const location = useLocation();
  const { quizType, quizData, selectedOptions } = location.state || {};
  const navigate = useNavigate();

  const getResults = () => {
    const correctAnswers = [];
    const incorrectAnswers = [];

    quizData.forEach((question, index) => {
      if (selectedOptions[index] === question.answer) {
        correctAnswers.push(question);
      } else {
        incorrectAnswers.push(question);
      }
    });

    return {
      correctCount: correctAnswers.length,
      incorrectCount: incorrectAnswers.length,
      correctAnswers,
      incorrectAnswers,
    };
  };

  if (!quizData || !selectedOptions) {
    return <div>잘못된 접근입니다.</div>;
  }

  const results = getResults();

  // 학습 페이지로 돌아가는 핸들러
  const handleGoToLearning = () => {
    navigate(`/learning`);
  };

  return (
    <div className="results">
      <h2>결과 화면</h2>
      <p>맞은 개수: {results.correctCount}</p>
      <p>틀린 개수: {results.incorrectCount}</p>

      {quizType === "word" ? (
        <>
          <h3>맞은 문제</h3>
          <ul>
            {results.correctAnswers.map((question, index) => (
              <li key={index}>
                {question.word} - 정답: {question.answer}
              </li>
            ))}
          </ul>
          <h3>틀린 문제</h3>
          <ul>
            {results.incorrectAnswers.map((question, index) => (
              <li key={index}>
                {question.word} - 당신의 답:{" "}
                {selectedOptions[quizData.indexOf(question)]}, 정답:{" "}
                {question.answer}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h3>맞은 문제</h3>
          <ul>
            {results.correctAnswers.map((question, index) => (
              <li key={index}>
                {question.sentence} - 정답: {question.answer}
              </li>
            ))}
          </ul>
          <h3>틀린 문제</h3>
          <ul>
            {results.incorrectAnswers.map((question, index) => (
              <li key={index}>
                {question.sentence} - 당신의 답:{" "}
                {selectedOptions[quizData.indexOf(question)]}, 정답:{" "}
                {question.answer}
              </li>
            ))}
          </ul>
        </>
      )}

      <button onClick={handleGoToLearning} className="retake-button">
        학습 페이지로 돌아가기
      </button>
    </div>
  );
};

export default QuizResult;
