import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import fetchBackendSubtitles from "../Subtitles/SubtitlesLoader/SubtitlesLoader";
import AllScript_SentenceBox from "./AllScript_SentenceBox";

const AllScript = ({ videoId }) => {
  const [scriptSentences, setScriptSentences] = useState([]);

  // script 데이터를 문장 단위로 처리하는 함수
  const processScript = (script) => {
    const sentences = script
      .replace(/\[.*?\]/g, "")
      // 문장 끝의 구두점(.?! 뒤에 공백이 있을 경우)으로 문장을 구분
      .split(/(?<=[.?!])\s+/)
      .map((sentence) => sentence.trim()) // 앞뒤 공백 제거
      .filter((sentence) => sentence.length > 0) // 빈 문장 제거
      .map((sentence) => {
        if (sentence.startsWith(".")) {
          // 문장이 '.'으로 시작하는 경우
          return sentence.substring(1) + "."; // 앞의 '.'을 제거하고 문장 끝에 추가
        }
        return sentence; // 그렇지 않으면 원래 문장 반환
      });

    return sentences;
  };

  useEffect(() => {
    const fetchSubtitles = async () => {
      try {
        // fetchBackendSubtitles 함수 사용
        const data = await fetchBackendSubtitles(videoId);

        // script 데이터를 문장 단위로 나누어 상태에 저장
        const sentences = processScript(data.script);

        setScriptSentences(sentences);
      } catch (error) {
        console.error(
          "전체 자막 스크립트 Error fetching subtitles, 목데이터 로드",
          error
        );

        // 서버 데이터 로드 실패 시 mock 데이터 로드
        try {
          const response = await fetch("/mockSubtitleData.JSON");
          const mockData = await response.json();

          // mock 데이터에서 script를 가져와 처리
          const sentences = processScript(mockData.script);
          setScriptSentences(sentences);
        } catch (mockError) {
          console.error("Error loading mock data:", mockError);
        }
      }
    };

    fetchSubtitles();
  }, [videoId]);

  return (
    <Box
      style={{
        backgroundColor: "grey",
        padding: "20px",
        overflowY: "auto",
        maxHeight: "100%",
      }}
      display="flex"
      flexDirection="column"
    >
      {scriptSentences.map((sentence, index) => (
        <AllScript_SentenceBox
          key={index}
          sentence={sentence}
          videoId={videoId}
        />
      ))}
    </Box>
  );
};

export default AllScript;
