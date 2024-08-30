import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./QuizResult.css";

const QuizResult = () => {
  const location = useLocation();
  const { quizType, quizData, selectedOptions, quizId } = location.state || {};
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
          incorrectIds.push(question.id);
        }
      });

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

  useEffect(() => {
    if (results && results.incorrectIds.length > 0) {
      const sendIncorrectIds = async () => {
        try {
          const payload = {
            sentence_id_list: [],
            word_id_list: [],
          };

          if (quizId !== undefined) {
            payload.quiz_id = quizId; // quizId가 undefined가 아닌 경우에만 추가
          }

          console.log(payload);

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

          if (quizType === "replay") {
            payload.mode = "replay"; // 오답 퀴즈인 경우 mode를 추가
          }

          if (
            payload.sentence_id_list.length > 0 ||
            payload.word_id_list.length > 0
          ) {
            const response = await axios.post("/quiz_result/", payload, {
              headers: {
                "Content-Type": "application/json",
              },
            });

            // 성공 시 콘솔에 출력
            console.log("Successfully sent incorrect IDs:", response.data);
          } else {
            console.log("No incorrect IDs to send.");
          }
        } catch (error) {
          console.error("Error sending incorrect IDs:", error);
        }
      };

      sendIncorrectIds();
    }
  }, [results, quizType, quizId]);

  if (!results) {
    return <div>Invalid Access</div>;
  }

  const handleGoToLearning = () => {
    navigate(`/learning`);
  };

  return (
    <div className="quiz-result-container">
      <h2 className="quiz-result-title">Quiz 결과</h2>
      <div className="results-summary">
        <div className="result-count">
          <span className="result-text">정답: {results.correctCount}</span>
          <span className="result-text">오답: {results.incorrectCount}</span>
        </div>

        <div className="result-details">
          {quizType === "word" ? (
            <>
              <h3 className="result-subtitle">Correct Answers</h3>
              <ul className="result-list">
                {results.correctAnswers.map((question, index) => (
                  <li key={index} className="result-item">
                    <span className="result-word">{question.word}</span>
                    {question.answer}
                  </li>
                ))}
              </ul>
              <h3 className="result-subtitle">Incorrect Answers</h3>
              <ul className="result-list">
                {results.incorrectAnswers.map((question, index) => (
                  <li key={index} className="result-item incorrect">
                    <span className="result-word">{question.word}</span> - Your
                    answer: {selectedOptions[quizData.indexOf(question)]} /
                    정답: {question.answer}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h3 className="result-subtitle">Correct Answers</h3>
              <ul className="result-list">
                {results.correctAnswers.map((question, index) => (
                  <li key={index} className="result-item">
                    <span className="result-sentence">{question.sentence}</span>{" "}
                    - Correct: {question.answer}
                  </li>
                ))}
              </ul>
              <h3 className="result-subtitle">Incorrect Answers</h3>
              <ul className="result-list">
                {results.incorrectAnswers.map((question, index) => (
                  <li key={index} className="result-item incorrect">
                    <span className="result-sentence">{question.sentence}</span>{" "}
                    - Your answer: {selectedOptions[quizData.indexOf(question)]}
                    , Correct: {question.answer}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <button onClick={handleGoToLearning} className="go-to-learning-button">
        학습 페이지로 돌아가기
      </button>
    </div>
  );
};

export default QuizResult;
