// Subtitles.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SubtitleActions from "./SubtitleActions/SubtitleActions";
import Button from "@mui/material/Button";
import WordSave from "./WordSave/WordSave";
import { Box } from "@mui/material";

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
    <div className="subtitles">
      {apiError}
      <div>
        <Button
          variant="contained"
          onClick={() => setShowEnglish(!showEnglish)}
        >
          {showEnglish ? "자막 켜기" : "자막 끄기"}
        </Button>
        <Button variant="contained" onClick={() => setShowKorean(!showKorean)}>
          {showKorean ? "번역 켜기" : "번역 끄기"}
        </Button>
      </div>
      <div>
        {englishSubtitles.map((subtitle, index) => (
          <div key={index} style={{ display: showEnglish ? "block" : "none" }}>
            {subtitle.text.split(" ").map((word, idx) => (
              <WordSave key={idx} word={word} />
            ))}
            <SubtitleActions subtitle={subtitle} />
          </div>
        ))}
        {koreanSubtitles.map((subtitle, index) => (
          <div key={index} style={{ display: showKorean ? "block" : "none" }}>
            {subtitle.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subtitles;
