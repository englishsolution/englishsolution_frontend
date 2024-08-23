import axios from "axios";

// 백엔드 API를 통해 자막 가져오기
export const fetchBackendSubtitles = async (videoId) => {
  try {
    // 백엔드 API 호출
    const baseURL = "http://15.165.135.23";
    const response = await axios.post(`/processing_url`, {
      url: `https://www.youtube.com/watch?v=${videoId}`,
      user_id: 1,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching backend subtitles:", error);
    throw error;
  }
};

export default fetchBackendSubtitles;
