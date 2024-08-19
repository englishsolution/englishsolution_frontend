import mockWordQuizData from "../mock/mockWordQuizData.json";
import mockSentenceQuizData from "../mock/mockSentenceQuizData.json";
import mockReplaySentenceQuizData from "../mock/mockReplaySentenceQuizData.json";
import mockReplayWordQuizData from "../mock/mockReplayWordQuizData.json";

// 단어 퀴즈 데이터 가져오기
const fetchWordQuizData = async (videoId) => {
  try {
    const response = await fetch(`/api/word-quiz/${videoId}`);

    // 응답 상태 코드 확인
    if (!response.ok) {
      throw new Error(`HTTP 오류! 상태: ${response.status}`);
    }

    // 응답의 Content-Type 확인
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("JSON 형식의 응답이 아닙니다.");
    }

    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error("단어 퀴즈 데이터 가져오기 오류:", error);
    // 오류 발생 시 모의 데이터 반환
    return mockWordQuizData.questions;
  }
};

// 문장 퀴즈 데이터 가져오기
const fetchSentenceQuizData = async (videoId) => {
  try {
    const response = await fetch(`/api/sentence-quiz/${videoId}`);

    // 응답 상태 코드 확인
    if (!response.ok) {
      throw new Error(`HTTP 오류! 상태: ${response.status}`);
    }

    // 응답의 Content-Type 확인
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("JSON 형식의 응답이 아닙니다.");
    }

    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error("문장 퀴즈 데이터 가져오기 오류:", error);
    // 오류 발생 시 모의 데이터 반환
    return mockSentenceQuizData.questions;
  }
};

// 리플레이 퀴즈 데이터 가져오기 (단어 퀴즈와 문장 퀴즈를 결합)
const fetchReplayQuizData = async (videoId) => {
  try {
    const [sentenceResponse, wordResponse] = await Promise.all([
      fetch(`/api/replay-sentence-quiz/${videoId}`),
      fetch(`/api/replay-word-quiz/${videoId}`),
    ]);

    // 응답 상태 코드 확인
    if (!sentenceResponse.ok || !wordResponse.ok) {
      throw new Error(
        `HTTP 오류! 상태: ${sentenceResponse.status} (문장), ${wordResponse.status} (단어)`
      );
    }

    // 응답의 Content-Type 확인
    const sentenceContentType = sentenceResponse.headers.get("Content-Type");
    const wordContentType = wordResponse.headers.get("Content-Type");
    if (
      !sentenceContentType ||
      !sentenceContentType.includes("application/json") ||
      !wordContentType ||
      !wordContentType.includes("application/json")
    ) {
      throw new Error("JSON 형식의 응답이 아닙니다.");
    }

    const [sentenceData, wordData] = await Promise.all([
      sentenceResponse.json(),
      wordResponse.json(),
    ]);

    // 데이터를 결합하고 무작위로 섞기
    const combinedData = [...sentenceData.questions, ...wordData.questions];
    combinedData.sort(() => Math.random() - 0.5);

    // 최대 10문제만 반환
    return combinedData.slice(0, 10);
  } catch (error) {
    console.error("리플레이 퀴즈 데이터 가져오기 오류:", error);

    // 오류 발생 시 모의 데이터 반환
    const combinedMockData = [
      ...mockReplaySentenceQuizData.questions,
      ...mockReplayWordQuizData.questions,
    ];
    combinedMockData.sort(() => Math.random() - 0.5);

    // 최대 10문제만 반환
    return combinedMockData.slice(0, 10);
  }
};

// 퀴즈 타입에 따라 적절한 데이터 가져오기
export const fetchQuizData = async (videoId, quizType) => {
  switch (quizType) {
    case "word":
      return await fetchWordQuizData(videoId);
    case "sentence":
      return await fetchSentenceQuizData(videoId);
    case "replay":
      return await fetchReplayQuizData(videoId);
    default:
      throw new Error(`알 수 없는 퀴즈 타입: ${quizType}`);
  }
};
