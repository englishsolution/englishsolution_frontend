import React, { useState, useEffect } from "react";
import VideoList from "./Savelist-components/VideoList/VideoList";
import SentenceList from "./Savelist-components/SentenceList/SentenceList";
import WordList from "./Savelist-components/WordList/WordList";
import Button from "@mui/material/Button";
import { Box, Container } from "@mui/material";
import "./SavelistPage.css";
import mockVideos from "../../mock/mockSaveVideoData.json";
import mockSentences from "../../mock/mockSaveSentenceData.json";
import mockWords from "../../mock/mockSaveWordData.json";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const SavelistPage = () => {
  const [selectedList, setSelectedList] = useState("video");
  const [allSentences, setAllSentences] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [loadingSentences, setLoadingSentences] = useState(true);
  const [loadingWords, setLoadingWords] = useState(true);
  const [videoError, setVideoError] = useState(null);
  const [sentenceError, setSentenceError] = useState(null);
  const [wordError, setWordError] = useState(null);

  // 비디오 데이터 가져오기
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/realtime/videos`);
        if (!response.ok) {
          throw new Error("비디오 네트워크 응답이 올바르지 않습니다.");
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        setVideoError(error.message);
        setVideos(mockVideos); // 오류 발생 시 목 데이터로 대체
        console.log(videoError);
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
        const response = await fetch(`${apiBaseUrl}/realtime/sentences`);
        if (!response.ok) {
          throw new Error("문장 네트워크 응답이 올바르지 않습니다.");
        }
        const data = await response.json();
        setAllSentences(data);
      } catch (error) {
        setSentenceError(error.message);
        setAllSentences(mockSentences); // 오류 발생 시 목 데이터로 대체
        console.log(sentenceError);
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
        const response = await fetch(`${apiBaseUrl}/realtime/words`);
        if (!response.ok) {
          throw new Error("단어 네트워크 응답이 올바르지 않습니다.");
        }
        const data = await response.json();
        setAllWords(data);
      } catch (error) {
        setWordError(error.message);
        setAllWords(mockWords); // 오류 발생 시 목 데이터로 대체
        console.log(wordError);
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
      case "video":
        return <VideoList videos={videos} />;
      case "sentence":
        return <SentenceList sentences={allSentences} />;
      case "word":
        return <WordList words={allWords} />;
      default:
        return <VideoList videos={videos} />; // 기본값으로 VideoList를 보여줍니다.
    }
  };

  return (
    <Container>
      <h1>저장 기록</h1>
      <Box className="savelistPage-container">
        <Box className="SavelistPage__btns">
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
