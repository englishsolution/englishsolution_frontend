import React, { useState } from "react";
import VideoList from "./Savelist-components/VideoList/VideoList";
import SentenceList from "./Savelist-components/SentenceList/SentenceList";
import WordList from "./Savelist-components/WordList/WordList";
import Button from "@mui/material/Button";
import { Box, Container } from "@mui/material";
import mockData from "../../mockData";
import "./SavelistPage.css";

const SavelistPage = () => {
  const [selectedList, setSelectedList] = useState("video");
  const [allSentences, setAllSentences] = useState([]);
  const [allWords, setAllWords] = useState([]);

  const handleButtonClick = (listType) => {
    if (listType === "sentence") {
      // Extract all sentences from mockData
      const sentences = mockData.flatMap((video) => video.sentences);
      setAllSentences(sentences);
    }

    if (listType === "word") {
      // Extract all sentences from mockData
      const words = mockData.flatMap((video) => video.words);
      setAllWords(words);
    }

    setSelectedList(listType);
  };

  // 선택된 리스트에 따라 해당 컴포넌트를 렌더링합니다.
  const renderList = () => {
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
      <Box class="savelistPage-container">
        <Box class="SavelistPage__btns">
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
