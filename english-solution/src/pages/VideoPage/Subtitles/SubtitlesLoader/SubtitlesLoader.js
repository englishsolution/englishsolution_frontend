import axios from "axios";

// YouTube Data API를 통해 영상의 영어 자막 가져오기

export const fetchYoutubeSubtitles = async (videoId) => {
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  try {
    // YouTube Data API 호출
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${API_KEY}`
    );

    // 각 자막의 정보를 가져오기 위해 Promise.all로 비동기 호출
    const subtitles = await Promise.all(
      response.data.items.map(async (item) => {
        const subtitleResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/captions/${item.id}?key=${API_KEY}`
        );
        return subtitleResponse.data;
      })
    );

    return subtitles;
  } catch (error) {
    console.error("Error fetching YouTube subtitles:", error);
    throw error;
  }
};

// 백엔드 API를 통해 한국어 자막 가져오기 (가정)
export const fetchBackendSubtitles = async (videoId) => {
  try {
    // 백엔드 API 호출
    const response = await axios.get(`/api/subtitles?videoId=${videoId}`);
    return response.data.korean;
  } catch (error) {
    console.error("Error fetching backend subtitles:", error);
    throw error;
  }
};
