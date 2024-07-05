import React, { useState } from "react";
import VideoList from "./Savelist-components/VideoList/VideoList";
import SentenceList from "./Savelist-components/SentenceList/SentenceList";
import WordList from "./Savelist-components/WordList/WordList";
import Button from "@mui/material/Button";
import { Box, Container } from "@mui/material";
import "./SavelistPage.css";

const SavelistPage = () => {
  const videos = [
    { id: "1", title: "Video 1", thumbnail: "https://via.placeholder.com/150" },
    { id: "2", title: "Video 2", thumbnail: "https://via.placeholder.com/150" },
    { id: "3", title: "Video 3", thumbnail: "https://via.placeholder.com/150" },
    { id: "4", title: "Video 4", thumbnail: "https://via.placeholder.com/150" },
    { id: "5", title: "Video 5", thumbnail: "https://via.placeholder.com/150" },
    { id: "6", title: "Video 6", thumbnail: "https://via.placeholder.com/150" },
    { id: "7", title: "Video 7", thumbnail: "https://via.placeholder.com/150" },
    { id: "8", title: "Video 8", thumbnail: "https://via.placeholder.com/150" },
    { id: "9", title: "Video 9", thumbnail: "https://via.placeholder.com/150" },

    { id: "1", title: "Video 1", thumbnail: "https://via.placeholder.com/150" },
    { id: "2", title: "Video 2", thumbnail: "https://via.placeholder.com/150" },
    { id: "3", title: "Video 3", thumbnail: "https://via.placeholder.com/150" },
    { id: "4", title: "Video 4", thumbnail: "https://via.placeholder.com/150" },
    { id: "5", title: "Video 5", thumbnail: "https://via.placeholder.com/150" },
    { id: "6", title: "Video 6", thumbnail: "https://via.placeholder.com/150" },
    { id: "7", title: "Video 7", thumbnail: "https://via.placeholder.com/150" },
  ];

  const sentences = [
    { date: "2024-07-05", text: "This is sentence 1." },
    { date: "2024-07-05", text: "Here is sentence 2." },
    { date: "2024-07-05", text: "Another example sentence." },
    { date: "2024-07-05", text: "Yet another sentence to display." },
    { date: "2024-07-05", text: "Final sentence in the list." },
    { date: "2024-07-05", text: "This is sentence 1." },
    { date: "2024-07-05", text: "Here is sentence 2." },
    { date: "2024-07-05", text: "Another example sentence." },
    { date: "2024-07-05", text: "Yet another sentence to display." },
    { date: "2024-07-05", text: "Final sentence in the list." },
    { date: "2024-07-05", text: "This is sentence 1." },
    { date: "2024-07-05", text: "Here is sentence 2." },
    { date: "2024-07-05", text: "Another example sentence." },
    { date: "2024-07-05", text: "Yet another sentence to display." },
    { date: "2024-07-05", text: "Final sentence in the list." },
    // 추가적인 문장 데이터...
  ];

  const words = [
    { english: "apple" },
    { english: "banana" },
    { english: "cherry" },
    { english: "date" },
    { english: "eggplant" },
    { english: "fig" },
    { english: "grape" },
    { english: "honeydew" },
    { english: "kiwi" },
    { english: "lemon" },
    { english: "mango" },
    { english: "nectarine" },
    { english: "orange" },
    { english: "pear" },
    { english: "quince" },
    { english: "raspberry" },
    { english: "strawberry" },
    { english: "tangerine" },
    { english: "apple" },
    { english: "banana" },
    { english: "cherry" },
    { english: "date" },
    { english: "eggplant" },
    { english: "fig" },
    { english: "grape" },
    { english: "honeydew" },
    { english: "kiwi" },
    { english: "lemon" },
    { english: "mango" },
    { english: "nectarine" },
    { english: "orange" },
    { english: "pear" },
    { english: "quince" },
    { english: "raspberry" },
    { english: "strawberry" },
    { english: "tangerine" },
    // 추가적인 단어 데이터...
  ];

  const [selectedList, setSelectedList] = useState("video"); // 기본값으로 video를 선택합니다.

  const handleButtonClick = (listType) => {
    setSelectedList(listType);
  };

  // 선택된 리스트에 따라 해당 컴포넌트를 렌더링합니다.
  const renderList = () => {
    switch (selectedList) {
      case "video":
        return <VideoList videos={videos} />;
      case "sentence":
        return <SentenceList sentences={sentences} />;
      case "word":
        return <WordList words={words} />;
      default:
        return <VideoList videos={videos} />; // 기본값으로 VideoList를 보여줍니다.
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
            영상 기록
          </Button>
          <Button
            className="sentence-list-btn"
            variant="contained"
            color="primary"
            sx={{ margin: "10px" }}
            onClick={() => handleButtonClick("sentence")}
          >
            문장 기록
          </Button>
          <Button
            className="word-list-btn"
            variant="contained"
            color="primary"
            sx={{ margin: "10px" }}
            onClick={() => handleButtonClick("word")}
          >
            단어 기록
          </Button>
        </Box>
        {renderList()}
      </Box>
    </Container>
  );
};

export default SavelistPage;
