import React, { useState, useEffect } from "react";
import SubtitleActions from "./SubtitleActions/SubtitleActions";
import WordSave from "./WordSave/WordSave";
import { Box, Switch, Typography } from "@mui/material";
import { fetchBackendSubtitles } from "./SubtitlesLoader/SubtitlesLoader";

// 자막 데이터가 올바른 구조를 갖추고 있는지 검증하는 함수
const validateSubtitleData = (subtitles) => {
  return subtitles.every(
    (sub) => sub.start !== undefined && sub.text !== undefined
  );
};

// 자막 데이터를 정렬하여 다음 자막의 시작 시간을 찾는 함수
const processSubtitles = (subtitles) => {
  return subtitles
    .map((sub, index) => ({
      ...sub,
      nextStart: subtitles[index + 1] ? subtitles[index + 1].start : Infinity,
    }))
    .sort((a, b) => a.start - b.start); // 자막을 start 시간 기준으로 정렬
};

const fetchMockSubtitles = async () => {
  try {
    const response = await fetch("/mockSubtitleData.JSON");
    console.log("목데이터 가져오기 함수 정상");
    if (!response.ok) {
      throw new Error("Failed to fetch mock subtitles");
    }
    return await response.json();
  } catch (error) {
    console.error("목데이터 가져오기 오류", error);
    throw error; // 에러를 다시 던져서 호출자에게 전달
  }
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

  // 자막 데이터 가져오기
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

        // 자막 데이터 처리 후 상태에 저장
        setEnglishSubtitles(processSubtitles(transcription_en));
        setKoreanSubtitles(processSubtitles(transcription_ko));
        setApiError(false);
        console.log(transcription_en);
      } catch (error) {
        console.error("실시간 자막 Error fetching subtitles:", error);
        setApiError(true);

        // mockSubtitles.JSON에서 자막 데이터 가져오기
        try {
          const mockData = await fetchMockSubtitles();
          const { transcription_en, transcription_ko } = mockData;

          setEnglishSubtitles(processSubtitles(transcription_en));
          setKoreanSubtitles(processSubtitles(transcription_ko));
        } catch (mockError) {
          console.error(
            "자막 불러오는 중 Error fetching mock subtitles:",
            mockError
          );

          // 자막 불러오기 실패 시 기본 메시지로 대체
          setEnglishSubtitles([
            { start: 0, text: "Failed to load subtitles!" },
          ]);
          setKoreanSubtitles([{ start: 0, text: "자막 불러오기 실패!" }]);
        }
      }
    };

    fetchSubtitles();
  }, [videoId]);

  // 비디오 재생 시간에 따라 현재 자막을 업데이트
  useEffect(() => {
    const updateSubtitles = () => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();

        // 현재 시간에 맞는 영어 자막 찾기
        const currentEnSubtitle = englishSubtitles.find(
          (sub) => currentTime >= sub.start && currentTime < sub.nextStart
        );

        // 현재 시간에 맞는 한국어 자막 찾기
        const currentKoSubtitle = koreanSubtitles.find(
          (sub) => currentTime >= sub.start && currentTime < sub.nextStart
        );

        // 현재 시간에 맞는 자막 상태 업데이트
        setCurrentSubtitle({
          start: currentEnSubtitle ? currentEnSubtitle.start : undefined,
          end: currentEnSubtitle ? currentEnSubtitle.nextStart : undefined,
          englishSubtitle: currentEnSubtitle ? currentEnSubtitle.text : "",
          koreanSubtitle: currentKoSubtitle ? currentKoSubtitle.text : "",
        });
      }
    };

    const intervalId = setInterval(updateSubtitles, 100); // 100ms 간격으로 자막 업데이트

    return () => clearInterval(intervalId); // 클린업 함수
  }, [englishSubtitles, koreanSubtitles, playerRef]);

  // 영어 자막 표시 토글 핸들러
  const handleEnglishToggle = () => {
    setShowEnglish(!showEnglish);
  };

  // 한국어 자막 표시 토글 핸들러
  const handleKoreanToggle = () => {
    setShowKorean(!showKorean);
  };

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" marginBottom={1}>
        <Typography sx={{ marginRight: "0px" }} variant="body1" marginRight={2}>
          English
        </Typography>
        <Switch checked={showEnglish} onChange={handleEnglishToggle} />

        <Typography variant="body1" sx={{ marginRight: "0px" }}>
          한국어
        </Typography>
        <Switch checked={showKorean} onChange={handleKoreanToggle} />
        {apiError && (
          <span color="error" marginBottom={2}>
            자막을 불러오는 중 오류가 발생했습니다.
          </span>
        )}
      </Box>

      <Box
        bgcolor="#f1f3f5"
        padding={2}
        marginBottom={2}
        display="flex"
        flexDirection="column"
      >
        {showEnglish && currentSubtitle && (
          <Box display="flex" alignItems="center" width="100%">
            <Box
              flexGrow={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography sx={{ fontSize: "20px" }}>
                {currentSubtitle.englishSubtitle.split(" ").map((word, idx) => (
                  <WordSave key={idx} word={word} videoId={videoId} />
                ))}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              position="absolute"
              right={0}
              paddingRight="30px"
            >
              <SubtitleActions subtitle={currentSubtitle} videoId={videoId} />
            </Box>
          </Box>
        )}
      </Box>

      <Box bgcolor="#f1f3f5" padding={2}>
        {showKorean && currentSubtitle && (
          <Typography align="center" sx={{ fontSize: "20px" }}>
            {currentSubtitle.koreanSubtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Subtitles;
