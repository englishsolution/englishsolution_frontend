// Subtitles.js
import React, { useState, useEffect } from "react";
import SubtitleActions from "./SubtitleActions/SubtitleActions";
import WordSave from "./WordSave/WordSave";
import { Box, Switch, Typography } from "@mui/material";
import { fetchBackendSubtitles } from "./SubtitlesLoader/SubtitlesLoader";

const validateSubtitleData = (subtitles) => {
  return subtitles.every(
    (sub) =>
      sub.start !== undefined && sub.end !== undefined && sub.text !== undefined
  );
};

const Subtitles = ({ videoId, playerRef }) => {
  const [englishSubtitles, setEnglishSubtitles] = useState([]);
  const [koreanSubtitles, setKoreanSubtitles] = useState([]);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showKorean, setShowKorean] = useState(true);
  const [apiError, setApiError] = useState(false); // 추가: API 호출 오류 상태
  const [currentEnglishSubtitle, setCurrentEnglishSubtitle] = useState(null);
  const [currentKoreanSubtitle, setCurrentKoreanSubtitle] = useState(null);

  useEffect(() => {
    const fetchSubtitles = async () => {
      try {
        const { transcription_en, transcription_ko } =
          await fetchBackendSubtitles(videoId);

        // Validate subtitle data before setting state
        if (
          !validateSubtitleData(transcription_en) ||
          !validateSubtitleData(transcription_ko)
        ) {
          throw new Error("Invalid subtitle data structure");
        }

        setEnglishSubtitles(transcription_en);
        setKoreanSubtitles(transcription_ko);
      } catch (error) {
        console.error("Error fetching subtitles:", error);
        setApiError(true);
        setEnglishSubtitles([
          { start: 0, end: 0, text: "Failed to load subtitles!" },
        ]);
        setKoreanSubtitles([{ start: 0, end: 0, text: "자막 불러오기 실패!" }]);
      }
    };

    fetchSubtitles();
  }, [videoId]);

  useEffect(() => {
    const updateSubtitles = () => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();

        // 자막 데이터의 구조를 검증
        if (
          !validateSubtitleData(englishSubtitles) ||
          !validateSubtitleData(koreanSubtitles)
        ) {
          console.error("Invalid subtitle data structure");
          return;
        }

        // 전체 자막 리스트에서 현재 재생 시간에 맞는 자막 찾기
        const currentEnSubtitle = englishSubtitles.find(
          (sub) => currentTime >= sub.start && currentTime <= sub.end
        );
        const currentKoSubtitle = koreanSubtitles.find(
          (sub) => currentTime >= sub.start && currentTime <= sub.end
        );

        // 현재 자막 상태 업데이트
        setCurrentEnglishSubtitle(currentEnSubtitle);
        setCurrentKoreanSubtitle(currentKoSubtitle);
      }
    };

    const intervalId = setInterval(updateSubtitles, 100); // 100ms마다 업데이트
    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 제거
  }, [englishSubtitles, koreanSubtitles, playerRef]);

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
      {apiError && (
        <Typography color="error" marginBottom={2}>
          자막을 불러오는 중 오류가 발생했습니다.
        </Typography>
      )}

      <Box bgcolor="#f1f3f5" padding={2} marginBottom={2}>
        {showEnglish && currentEnglishSubtitle && (
          <Typography>
            {currentEnglishSubtitle.text.split(" ").map((word, idx) => (
              <WordSave key={idx} word={word} />
            ))}
            <SubtitleActions subtitle={currentEnglishSubtitle} />
          </Typography>
        )}
      </Box>

      <Box bgcolor="#f1f3f5" padding={2}>
        {showKorean && currentKoreanSubtitle && (
          <Typography>{currentKoreanSubtitle.text}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Subtitles;
