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

const SavelistPage = () => {
  const [selectedList, setSelectedList] = useState("video");
  const [allSentences, setAllSentences] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 오류 상태 추가

  useEffect(() => {
    // 비디오 데이터를 가져옵니다.
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://15.165.135.23/save"); // 백엔드 API 주소
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        setError(error.message);
        setVideos(mockVideos); // 오류 발생 시 mock 데이터로 대체
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    // 문장 데이터를 가져옵니다.
    const fetchSentences = async () => {
      try {
        const response = await fetch("http://15.165.135.23/realtime/sentences"); // 백엔드 API 주소
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        const data = await response.json();
        setAllSentences(data);
      } catch (error) {
        setError(error.message);
        setAllSentences(mockSentences); // 오류 발생 시 mock 데이터로 대체
      }
    };

    // 단어 데이터를 가져옵니다.
    const fetchWords = async () => {
      try {
        const response = await fetch("http://15.165.135.23/realtime/words"); // 백엔드 API 주소
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        const data = await response.json();
        setAllWords(data);
      } catch (error) {
        setError(error.message);
        setAllWords(mockWords); // 오류 발생 시 mock 데이터로 대체
      }
    };

    fetchVideos();
    fetchSentences();
    fetchWords();
  }, []); // 컴포넌트가 처음 렌더링될 때만 데이터 로드

  const handleButtonClick = (listType) => {
    setSelectedList(listType);
  };

  // 선택된 리스트에 따라 해당 컴포넌트를 렌더링합니다.
  const renderList = () => {
    if (loading) return <p>Loading...</p>; // 로딩 중 표시
    // if (error) return <p>Error: {error}</p>; // 오류 발생 시 표시

    switch (selectedList) {
      case "video":
        return <VideoList />;
      case "sentence":
        return <SentenceList sentences={allSentences} />;
      case "word":
        return <WordList words={allWords} />;
      default:
        return <VideoList />; // 기본값으로 VideoList를 보여줍니다.
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
