import React, { useState, useEffect } from "react";
import mockData from "../../mockData";
import WordQuizResult from "./WordQuizResult";
import "./WordQuiz.css"; // 스타일 시트 파일을 가져옵니다.

const getRandomElements = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateQuizData = (videoId) => {
  const videoData = mockData.find((video) => video.video_id === videoId);
  if (!videoData) return [];

  const words = getRandomElements(videoData.words, 10);

  return words.map((word) => {
    const options = [word.word_kr];
    while (options.length < 4) {
      const randomWord =
        videoData.words[Math.floor(Math.random() * videoData.words.length)];
      if (!options.includes(randomWord.word_kr)) {
        options.push(randomWord.word_kr);
      }
    }

    options.sort(() => 0.5 - Math.random());

    return {
      question: word.word_eg,
      correctAnswer: word.word_kr,
      options,
    };
  });
};

const WordQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quizData, setQuizData] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const videoId = "dQw4w9WgXcQ"; // Example video ID
    const data = generateQuizData(videoId);
    setQuizData(data);
  }, []);

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
  };

  if (showResults) {
    return (
      <WordQuizResult quizData={quizData} selectedOptions={selectedOptions} />
    );
  }

  if (!quizData.length) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const selectedOption = selectedOptions[currentQuestionIndex];

  return (
    <div className="app">
      <h2>아래 단어의 뜻은?</h2>
      <div className="question-box">
        <h3>{currentQuestion.question}</h3>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`option ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {index + 1}. {option}
            </div>
          ))}
        </div>

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
      </div>
      <div>{currentQuestionIndex + 1}</div>
    </div>
  );
};

export default WordQuiz;
