import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizDataLoader = ({ onDataLoaded }) => {
  const { quizType, videoId } = useParams();

  const user_id = 1; // 임시 하드코딩, 로그인 연동 필요
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        let url = "";
        let postData = { user_id: user_id, video_id: videoId };
        let transformData = (data) => data.json_quiz.questions;

        if (quizType === "word") {
          url = "/all_word_quiz/";
          transformData = (data) =>
            data.json_quiz.questions.map((question, index) => ({
              ...question,
              id: data.quiz_id_list[index],
            }));
        } else if (quizType === "sentence") {
          url = "/all_sentence_quiz/";
          transformData = (data) =>
            data.json_quiz.questions.map((question, index) => ({
              ...question,
              id: data.quiz_id_list[index],
            }));
        } else if (quizType === "replay") {
          url = "/replay_quiz/";
          transformData = (data) => {
            const combinedQuizzes = [
              ...data.word_quiz.map(([question, id]) => ({
                ...question,
                type: "word",
                id: id,
              })),
              ...data.sentence_quiz.map(([question, id]) => ({
                ...question,
                type: "sentence",
                id: id,
              })),
            ];
            return combinedQuizzes.sort(() => Math.random() - 0.5);
          };
        }
        console.log(postData);
        const response = await axios.post(`${url}`, postData);

        const quizData = transformData(response.data);
        onDataLoaded(quizData);
      } catch (error) {
        setError("퀴즈 데이터를 로딩하는 중 오류가 발생했습니다.");
        console.error("퀴즈 데이터 로딩 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, [quizType, videoId, onDataLoaded]);

  if (loading) {
    return <div>Loading...!</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null; // 데이터가 로딩되면 QuizTemplate이 데이터를 렌더링할 것입니다.
};

export default QuizDataLoader;
