import React, { useState, useEffect } from "react";
import axios from "axios";
import SentenceList from "./Savelist-components/SentenceList/SentenceList";
import WordList from "./Savelist-components/WordList/WordList";
import Button from "@mui/material/Button";
import { Box, Container } from "@mui/material";
import "./SavelistPage.css";
// // Mock data imports
// import mockSentences from "../../mock/mockSaveSentenceData.json";
// import mockWords from "../../mock/mockSaveWordData.json";
// import mockVideos from "../../mock/mockSaveVideoData.json";

// Uncomment this if you later want to use video-related functionality
import VideoList from "./Savelist-components/VideoList/VideoList";

const SavelistPage = () => {
  const [selectedList, setSelectedList] = useState("video");
  const [allSentences, setAllSentences] = useState([]);
  const [allWords, setAllWords] = useState([]);
  // Uncomment these if you later want to use video-related functionality
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [loadingSentences, setLoadingSentences] = useState(true);
  const [loadingWords, setLoadingWords] = useState(true);
  // Uncomment these if you later want to use video-related functionality
  const [videoError, setVideoError] = useState(null);
  const [sentenceError, setSentenceError] = useState(null);
  const [wordError, setWordError] = useState(null);

  // 비디오 데이터 가져오기
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/realtime/videos`);
        setVideos(response.data);
      } catch (error) {
        setVideoError(error.message);
        console.log("비디오 데이터를 불러올 수 없음");
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchVideos();
  }, []);

  // 문장 데이터 가져오기
  useEffect(() => {
    const fetchSentences = async () => {
      try {
        const response = await axios.get(`/realtime/sentences`);
        setAllSentences(response.data);
      } catch (error) {
        setSentenceError(error.message);
        console.log("문장 데이터를 불러올 수 없음");
      } finally {
        setLoadingSentences(false);
      }
    };

    fetchSentences();
  }, []);

  // 단어 데이터 가져오기
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get(`/realtime/words`);
        setAllWords(response.data);
      } catch (error) {
        setWordError(error.message);
        console.log("단어 데이터를 불러올 수 없음");
      } finally {
        setLoadingWords(false);
      }
    };

    fetchWords();
  }, []);

  const handleButtonClick = (listType) => {
    setSelectedList(listType);
  };

  const renderList = () => {
    if (loadingVideos || loadingSentences || loadingWords) {
      return <p>Loading...</p>; // 로딩 중 표시
    }

    switch (selectedList) {
      case "sentence":
        if (sentenceError) return <p>{sentenceError}</p>;
        if (allSentences.length === 0) return <p>저장된 문장이 없습니다.</p>;
        return <SentenceList sentences={allSentences} />;
      case "word":
        if (wordError) return <p>{wordError}</p>;
        if (allWords.length === 0) return <p>저장된 단어가 없습니다.</p>;
        return <WordList words={allWords} />;
      // Uncomment this case if you later want to use video-related functionality

      case "video":
        if (videoError) return <p>{videoError}</p>;
        if (videos.length === 0) return <p>저장된 비디오가 없습니다.</p>;
        return <VideoList videos={videos} />;

      default:
        return <VideoList videos={videos} />;
    }
  };

  return (
    <Container>
      <h1>저장 기록</h1>
      <Box className="savelistPage-container">
        <Box className="SavelistPage__btns">
          {/* Uncomment this button if you later want to use video-related functionality */}
          <Button
            className="youtube-list-btn"
            variant="contained"
            color="primary"
            sx={{ margin: "10px" }}
            onClick={() => handleButtonClick("video")}
          >
            전체 영상 기록
          </Button>
          <Button
            className="sentence-list-btn"
            variant="contained"
            color="primary"
            sx={{ margin: "10px" }}
            onClick={() => handleButtonClick("sentence")}
          >
            전체 문장 기록
          </Button>
          <Button
            className="word-list-btn"
            variant="contained"
            color="primary"
            sx={{ margin: "10px" }}
            onClick={() => handleButtonClick("word")}
          >
            전체 단어 기록
          </Button>
        </Box>
        {renderList()}
      </Box>
    </Container>
  );
};

export default SavelistPage;
