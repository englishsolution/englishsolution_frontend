// Subtitles.js
import React, { useState, useEffect } from "react";
import SubtitleActions from "./SubtitleActions/SubtitleActions";
import WordSave from "./WordSave/WordSave";
import { Box, Switch, Typography } from "@mui/material";
import { fetchYoutubeSubtitles } from "./SubtitlesLoader/SubtitlesLoader";

const Subtitles = ({ videoId }) => {
  const [englishSubtitles, setEnglishSubtitles] = useState([]);
  const [koreanSubtitles, setKoreanSubtitles] = useState([]);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showKorean, setShowKorean] = useState(true);
  const [apiError, setApiError] = useState(false); // 추가: API 호출 오류 상태

  useEffect(() => {
    const fetchSubtitles = async () => {
      try {
        // YouTube Data API를 통해 영어 자막 가져오기
        const youtubeSubtitles = await fetchYoutubeSubtitles(videoId);
        setEnglishSubtitles(youtubeSubtitles);

        // 한국어 자막은 아직 준비되지 않았으므로 임시 메시지 사용
        setKoreanSubtitles([{ text: "한국어 자막 준비 중입니다." }]);
      } catch (error) {
        console.error("Error fetching subtitles:", error);
        setApiError(true); // API 호출 오류가 발생했음을 설정
        setEnglishSubtitles([{ text: "Failed to load subtitles..." }]);
        setKoreanSubtitles([{ text: "자막 불러오기 실패!" }]);
      }
    };

    fetchSubtitles();
  }, [videoId]);

  // 자막 표시/숨기기 토글 함수
  const handleEnglishToggle = () => {
    setShowEnglish(!showEnglish);
  };

  const handleKoreanToggle = () => {
    setShowKorean(!showKorean);
  };

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" marginBottom={1}>
        <Typography variant="body1" marginRight={2}>
          영어 자막 {showEnglish ? "끄기" : "켜기"}
        </Typography>
        <Switch checked={showEnglish} onChange={handleEnglishToggle} />

        <Typography variant="body1">
          한국어 자막 {showKorean ? "끄기" : "켜기"}
        </Typography>
        <Switch checked={showKorean} onChange={handleKoreanToggle} />
      </Box>
      <Box bgcolor="#f1f3f5" padding={2} marginBottom={2}>
        {showEnglish &&
          englishSubtitles.map((subtitle, index) => (
            <Typography key={index}>
              {subtitle.text.split(" ").map((word, idx) => (
                <WordSave key={idx} word={word} />
              ))}
              <SubtitleActions subtitle={subtitle} />
            </Typography>
          ))}
      </Box>

      <Box bgcolor="#f1f3f5" padding={2}>
        {koreanSubtitles.map((subtitle, index) => (
          <Typography
            key={index}
            style={{ display: showKorean ? "block" : "none" }}
          >
            {subtitle.text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Subtitles;
