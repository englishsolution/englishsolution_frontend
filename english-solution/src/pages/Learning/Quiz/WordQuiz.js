import React from "react";
import QuizTemplate from "./QuizTemplate";

const WordQuiz = () => {
  const videoId = "dQw4w9WgXcQ"; // Example video ID
  return <QuizTemplate videoId={videoId} quizType="word" />;
};

export default WordQuiz;
