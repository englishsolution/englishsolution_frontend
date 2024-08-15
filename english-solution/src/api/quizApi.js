import {
  mockWordQuizData,
  mockSentenceQuizData,
} from "../pages/Learning/Quiz/mockQuizData";

export const fetchQuizData = async (videoId, quizType) => {
  // 실제 API 호출 대신 하드코딩된 데이터 반환
  try {
    // 하드코딩된 videoId와 quizType에 따른 데이터 선택
    if (quizType === "word") {
      return mockWordQuizData;
    } else if (quizType === "sentence") {
      return mockSentenceQuizData;
    } else {
      throw new Error("Invalid quizType");
    }
  } catch (error) {
    console.error("Failed to fetch quiz data:", error);
    return { questions: [] }; // 에러 발생 시 빈 데이터 반환
  }
};
