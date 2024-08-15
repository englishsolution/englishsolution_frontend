import React from "react";

const WordQuizResult = ({ quizData, selectedOptions }) => {
  const getResults = () => {
    const correctAnswers = quizData.filter(
      (question, index) => selectedOptions[index] === question.correctAnswer
    );
    const incorrectAnswers = quizData.filter(
      (question, index) => selectedOptions[index] !== question.correctAnswer
    );

    return {
      correctCount: correctAnswers.length,
      incorrectCount: incorrectAnswers.length,
      correctAnswers,
      incorrectAnswers,
    };
  };

  const results = getResults();

  return (
    <div className="results">
      <h2>결과 화면</h2>
      <p>맞은 개수: {results.correctCount}</p>
      <p>틀린 개수: {results.incorrectCount}</p>
      <h3>맞은 문제</h3>
      <ul>
        {results.correctAnswers.map((question, index) => (
          <li key={index}>
            {question.question} - 정답: {question.correctAnswer}
          </li>
        ))}
      </ul>
      <h3>틀린 문제</h3>
      <ul>
        {results.incorrectAnswers.map((question, index) => (
          <li key={index}>
            {question.question} - 당신의 답:{" "}
            {selectedOptions[quizData.indexOf(question)]}, 정답:{" "}
            {question.correctAnswer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordQuizResult;
