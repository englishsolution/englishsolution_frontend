import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizDataLoader = ({ onDataLoaded, onError }) => {
  const { quizType, videoId } = useParams();

  const user_id = "1"; // 임시 하드코딩, 로그인 연동 필요
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        let url = "";
        let postData = { user_id: user_id, video_identify: videoId };
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
        const quizId = response.data.quiz_id;
        onDataLoaded(quizData, quizId);
        console.log(`퀴즈아이디: ${quizId}`);
        // quizId가 undefined인 경우를 처리합니다.
        if (!quizId) {
          throw new Error("quiz_id가 응답에 없습니다.");
        }
        onDataLoaded(quizData, quizId);
        console.log(`퀴즈아이디: ${quizId}`);
      } catch (error) {
        setError("퀴즈 데이터를 로딩하는 중 오류가 발생했습니다.");
        console.error("퀴즈 데이터 로딩 오류:", error);
        if (onError) {
          onError(error.message); // 에러 메시지를 onError 콜백으로 전달
        }
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
