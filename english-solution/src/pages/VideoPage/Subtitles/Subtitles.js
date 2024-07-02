// Subtitles.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SubtitleActions from "./SubtitleActions/SubtitleActions";
import Button from "@mui/material/Button";
import WordSave from "./WordSave/WordSave";
import { Box, Switch, Typography } from "@mui/material";

const Subtitles = ({ videoId }) => {
  const [englishSubtitles, setEnglishSubtitles] = useState([]);
  const [koreanSubtitles, setKoreanSubtitles] = useState([]);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showKorean, setShowKorean] = useState(true);
  const [apiError, setApiError] = useState(false); // 추가: API 호출 오류 상태

  useEffect(() => {
    const fetchSubtitles = async () => {
      try {
        const response = await axios.get(`/api/subtitles?videoId=${videoId}`);
        setEnglishSubtitles(response.data.english);
        setKoreanSubtitles(response.data.korean);
      } catch (error) {
        console.error("Error fetching subtitles:", error);
        setApiError(true); // API 호출 오류가 발생했음을 설정
        // API 호출 실패 시, default subtitle을 설정할 수 있습니다.
        setEnglishSubtitles([{ text: "Failed to load subtitles!" }]); // default subtitle 설정
        setKoreanSubtitles([{ text: "자막 불러오기 실패!" }]); // default subtitle 설정
      }
    };
    fetchSubtitles();
  }, [videoId]);

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <Box display="flex" alighItems="center" marginBottom={1}>
        <Typography variant="body1" marginRight={2}>
          영어 자막 {showEnglish ? "끄기" : "켜기"}
        </Typography>
        <Switch
          checked={showEnglish}
          onChange={() => setShowEnglish(!showEnglish)}
        />

        <Typography variant="body1">
          한국어 번역 {showKorean ? "끄기" : "켜기"}
        </Typography>
        <Switch
          checked={showKorean}
          onChange={() => setShowKorean(!showKorean)}
        />
      </Box>
      <Box bgcolor="#f1f3f5" padding={2} marginBottom={2}>
        {englishSubtitles.map((subtitle, index) => (
          <Typography
            key={index}
            style={{ display: showEnglish ? "block" : "none" }}
          >
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
