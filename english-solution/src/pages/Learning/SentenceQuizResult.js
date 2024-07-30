import React from "react";

const SentenceQuizResult = ({ quizData, userAnswers }) => {
  const correctAnswers = quizData.filter(
    (data, index) => data.correctAnswer === userAnswers[index]
  ).length;

  return (
    <div>
      <h2>퀴즈 결과</h2>
      <p>총 문제 수: {quizData.length}</p>
      <p>정답 수: {correctAnswers}</p>
      <p>정답률: {((correctAnswers / quizData.length) * 100).toFixed(2)}%</p>
      {quizData.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          <p>문장: {question.sentenceWithBlank}</p>
          <p>입력한 답: {userAnswers[index]}</p>
          <p>정답: {question.correctAnswer}</p>
        </div>
      ))}
    </div>
  );
};

export default SentenceQuizResult;
