import React, { useState, useEffect } from "react";
import SubtitleActions from "./SubtitleActions/SubtitleActions";
import WordSave from "./WordSave/WordSave";
import { Box, Switch, Typography } from "@mui/material";
import { fetchBackendSubtitles } from "./SubtitlesLoader/SubtitlesLoader";

// 자막 데이터가 올바른 구조를 갖추고 있는지 확인하는 함수
const validateSubtitleData = (subtitles) => {
  return subtitles.every(
    (sub) =>
      sub.start !== undefined && sub.end !== undefined && sub.text !== undefined
  );
};

const Subtitles = ({ videoId, playerRef }) => {
  // 영어 및 한국어 자막을 저장할 상태 변수
  const [englishSubtitles, setEnglishSubtitles] = useState([]);
  const [koreanSubtitles, setKoreanSubtitles] = useState([]);

  // 자막 표시 여부를 제어하는 상태 변수
  const [showEnglish, setShowEnglish] = useState(true);
  const [showKorean, setShowKorean] = useState(true);

  // API 호출 시 오류 상태를 관리하는 상태 변수
  const [apiError, setApiError] = useState(false);

  // 현재 비디오 재생 시간에 맞는 자막을 저장할 상태 변수
  const [currentSubtitle, setCurrentSubtitle] = useState(null);

  // 컴포넌트가 마운트될 때 비디오 ID를 기반으로 자막 데이터를 백엔드에서 가져오는 함수
  useEffect(() => {
    const fetchSubtitles = async () => {
      try {
        // 백엔드에서 자막 데이터를 가져옴
        const { transcription_en, transcription_ko } =
          await fetchBackendSubtitles(videoId);

        // 자막 데이터 구조가 올바른지 검증
        if (
          !validateSubtitleData(transcription_en) ||
          !validateSubtitleData(transcription_ko)
        ) {
          throw new Error("Invalid subtitle data structure");
        }

        // 자막 데이터를 상태에 저장
        setEnglishSubtitles(transcription_en);
        setKoreanSubtitles(transcription_ko);
      } catch (error) {
        console.error("Error fetching subtitles:", error);
        setApiError(true);

        // 자막 불러오기 실패 시 기본 메시지로 대체
        setEnglishSubtitles([
          { start: 0, end: 0, text: "Failed to load subtitles!" },
        ]);
        setKoreanSubtitles([{ start: 0, end: 0, text: "자막 불러오기 실패!" }]);
      }
    };

    // 자막 데이터를 가져오는 함수를 호출
    fetchSubtitles();
  }, [videoId]);

  // 비디오 재생 시간에 따라 현재 자막을 업데이트하는 함수
  useEffect(() => {
    let animationFrameId;

    const updateSubtitles = () => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();

        // 현재 시간에 맞는 영어 자막 찾기
        const currentEnSubtitle = englishSubtitles.find(
          (sub) => currentTime >= sub.start && currentTime <= sub.end
        );

        // 현재 시간에 맞는 한국어 자막 찾기
        const currentKoSubtitle = koreanSubtitles.find(
          (sub) => currentTime >= sub.start && currentTime <= sub.end
        );

        // 영어와 한국어 자막을 모두 포함하는 subtitle 객체 생성
        const subtitle = {
          start: currentTime,
          end: currentTime + 1, // 예시로 현재 시간 + 1초를 종료 시간으로 설정
          englishSubtitle: currentEnSubtitle ? currentEnSubtitle.text : "",
          koreanSubtitle: currentKoSubtitle ? currentKoSubtitle.text : "",
        };

        // 현재 자막을 상태에 저장
        setCurrentSubtitle(subtitle);
      }
      // 다음 프레임에서 다시 updateSubtitles 호출
      animationFrameId = requestAnimationFrame(updateSubtitles);
    };

    // 자막 업데이트 함수 초기 실행 및 애니메이션 루프 시작
    updateSubtitles();

    // 컴포넌트 언마운트 시 애니메이션 프레임 취소
    return () => cancelAnimationFrame(animationFrameId);
  }, [englishSubtitles, koreanSubtitles, playerRef]);

  // 영어 자막 표시 여부를 토글하는 함수
  const handleEnglishToggle = () => {
    setShowEnglish(!showEnglish);
  };

  // 한국어 자막 표시 여부를 토글하는 함수
  const handleKoreanToggle = () => {
    setShowKorean(!showKorean);
  };

  return (
    <Box flex={1} display="flex" flexDirection="column">
      {/* 자막 토글 스위치 */}
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

      {/* 자막 불러오기 실패 시 에러 메시지 표시 */}
      {apiError && (
        <Typography color="error" marginBottom={2}>
          자막을 불러오는 중 오류가 발생했습니다.
        </Typography>
      )}

      {/* 현재 시간에 맞는 영어 자막 표시 */}
      <Box bgcolor="#f1f3f5" padding={2} marginBottom={2}>
        {showEnglish && currentSubtitle && (
          <Box display="flex" alignItems="center">
            <Typography>
              {currentSubtitle.englishSubtitle.split(" ").map((word, idx) => (
                <WordSave key={idx} word={word} videoId={videoId} />
              ))}
            </Typography>
            <Box display="flex" alignItems="center" marginLeft={2}>
              <SubtitleActions subtitle={currentSubtitle} videoId={videoId} />
            </Box>
          </Box>
        )}
      </Box>

      {/* 현재 시간에 맞는 한국어 자막 표시 */}
      <Box bgcolor="#f1f3f5" padding={2}>
        {showKorean && currentSubtitle && (
          <Typography>{currentSubtitle.koreanSubtitle}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Subtitles;
