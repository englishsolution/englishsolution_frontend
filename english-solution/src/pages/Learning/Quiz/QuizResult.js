import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./QuizResult.css";

const QuizResult = () => {
  const location = useLocation();
  const { quizType, quizData, selectedOptions } = location.state || {};
  const navigate = useNavigate();

  const [results, setResults] = useState(null);

  useEffect(() => {
    if (!quizData || !selectedOptions) {
      return;
    }

    const getResults = () => {
      const correctAnswers = [];
      const incorrectAnswers = [];
      const incorrectIds = [];

      quizData.forEach((question, index) => {
        if (selectedOptions[index] === question.answer) {
          correctAnswers.push(question);
        } else {
          incorrectAnswers.push(question);
          incorrectIds.push(question.id); // 오답의 문제 ID를 저장
        }
      });

      console.log("퀴즈 문제 데이터:", quizData);
      console.log("선택된 옵션:", selectedOptions);
      console.log("오답 문제 ID:", incorrectIds);

      return {
        correctCount: correctAnswers.length,
        incorrectCount: incorrectAnswers.length,
        correctAnswers,
        incorrectAnswers,
        incorrectIds,
      };
    };

    const calculatedResults = getResults();
    setResults(calculatedResults);
  }, [quizData, selectedOptions]);

  // 오답 ID 리스트 서버로 전송
  useEffect(() => {
    if (results && results.incorrectIds.length > 0) {
      const sendIncorrectIds = async () => {
        try {
          const payload = {
            sentence_id_list: [],
            word_id_list: [],
          };

          // quizType에 따라 올바른 배열에 ID 추가
          results.incorrectIds.forEach((id) => {
            if (
              quizData.some(
                (question) => question.id === id && question.sentence
              )
            ) {
              payload.sentence_id_list.push(id);
            } else {
              payload.word_id_list.push(id);
            }
          });

          // 데이터 전송 전 콘솔 로그로 확인
          console.log("전송할 데이터:", payload);

          if (
            payload.sentence_id_list.length > 0 ||
            payload.word_id_list.length > 0
          ) {
            await axios.post("/quiz_result/", payload, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log("오답 ID 리스트 전송 완료:", payload);
          }
        } catch (error) {
          console.error("오답 ID 리스트 전송 중 오류 발생:", error);
        }
      };

      sendIncorrectIds();
    }
  }, [results, quizType]);

  if (!results) {
    return <div>잘못된 접근입니다.</div>;
  }

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
