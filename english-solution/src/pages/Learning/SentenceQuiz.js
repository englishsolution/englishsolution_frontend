import React, { useState, useEffect } from "react";
import mockData from "../../mockData";
import SentenceQuizResult from "./SentenceQuizResult";
import "./SentenceQuiz.css"; // 스타일 시트 파일을 가져옵니다.

const getRandomSentenceElements = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateSentenceQuizData = (videoId) => {
  const videoData = mockData.find((video) => video.video_id === videoId);
  if (!videoData) return [];

  const sentences = getRandomSentenceElements(videoData.sentences, 10);

  return sentences.map((sentence) => {
    const words = sentence.sentence_eg.split(" ");
    const wordToRemove = words[Math.floor(Math.random() * words.length)];

    const modifiedSentence = sentence.sentence_eg.replace(
      wordToRemove,
      "_____"
    );

    return {
      question: sentence.sentence_kr,
      sentenceWithBlank: modifiedSentence,
      correctAnswer: wordToRemove,
    };
  });
};

const SentenceQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizData, setQuizData] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const videoId = "dQw4w9WgXcQ"; // Example video ID
    const data = generateSentenceQuizData(videoId);
    setQuizData(data);
  }, []);

  const handleAnswerChange = (event) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: event.target.value,
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
  };

  if (showResults) {
    return <SentenceQuizResult quizData={quizData} userAnswers={userAnswers} />;
  }

  if (!quizData.length) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex] || "";

  return (
    <div className="app">
      <h2>아래 문장의 빈칸에 들어갈 단어를 입력하세요:</h2>
      <div className="question-box">
        <h3>{currentQuestion.question}</h3>
        <p>{currentQuestion.sentenceWithBlank}</p>
        <input
          type="text"
          value={userAnswer}
          onChange={handleAnswerChange}
          placeholder="단어를 입력하세요"
        />
        <div className="navigation-buttons">
          <button
            onClick={handlePreviousClick}
            disabled={currentQuestionIndex === 0}
          >
            이전 문제
          </button>
          {currentQuestionIndex < quizData.length - 1 ? (
            <button
              onClick={handleNextClick}
              disabled={currentQuestionIndex === quizData.length - 1}
            >
              다음 문제
            </button>
          ) : (
            <form onSubmit={handleSubmit}>
              <button type="submit" className="submit-button">
                제출
              </button>
            </form>
          )}
        </div>
      </div>
      <div>{currentQuestionIndex + 1}</div>
    </div>
  );
};

export default SentenceQuiz;
