import React, { useState } from "react";
import VideoList from "./Savelist-components/VideoList/VideoList";
import SentenceList from "./Savelist-components/SentenceList/SentenceList";
import WordList from "./Savelist-components/WordList/WordList";
import Button from "@mui/material/Button";
import { Box, Container } from "@mui/material";
import "./SavelistPage.css";

const SavelistPage = () => {
  const videos = [
    {
      id: "1",
      title: "How to Make Perfect Pancakes",
      thumbnail: "https://via.placeholder.com/180x100.png?text=Video+1",
    },
    {
      id: "2",
      title: "Exploring the Grand Canyon",
      thumbnail: "https://via.placeholder.com/180x100.png?text=Video+2",
    },
    {
      id: "3",
      title: "A Journey Through Tokyo",
      thumbnail: "https://via.placeholder.com/180x100.png?text=Video+3",
    },
    {
      id: "4",
      title: "Cooking Authentic Italian Pizza",
      thumbnail: "https://via.placeholder.com/180x100.png?text=Video+4",
    },
    {
      id: "5",
      title: "Learning Guitar: Beginner Tips",
      thumbnail: "https://via.placeholder.com/180x100.png?text=Video+5",
    },
    {
      id: "6",
      title: "Morning Yoga Routine",
      thumbnail: "https://via.placeholder.com/180x100.png?text=Video+6",
    },
    {
      id: "7",
      title: "Visiting Paris in Spring",
      thumbnail: "https://via.placeholder.com/180x100.png?text=Video+7",
    },
    {
      id: "8",
      title: "DIY Home Decor Ideas",
      thumbnail: "https://via.placeholder.com/180x100.png?text=Video+8",
    },
  ];

  const sentences = [
    { date: "2024-06-03", text: "Are you ready for the adventure?" },
    { date: "2024-06-07", text: "She looked at him and smiled." },
    { date: "2024-06-10", text: "This is a crucial moment in history." },
    { date: "2024-06-28", text: "He couldn't shake the feeling of déjà vu." },
    { date: "2024-07-02", text: "We must act now to save the planet." },
    { date: "2024-07-05", text: "In the end, it was all worth it." },
    { date: "2024-07-09", text: "This is just the beginning of the story." },
    { date: "2024-07-05", text: "Another example sentence." },
    { date: "2024-07-05", text: "Yet another sentence to display." },
    { date: "2024-06-01", text: "I can't believe this is happening." },
    { date: "2024-06-03", text: "Are you ready for the adventure?" },
    { date: "2024-06-07", text: "She looked at him and smiled." },
    { date: "2024-06-10", text: "This is a crucial moment in history." },
    { date: "2024-06-12", text: "He whispered something in her ear." },
    { date: "2024-06-15", text: "The sun was setting over the horizon." },
    { date: "2024-06-18", text: "Let's make today unforgettable." },
    { date: "2024-06-20", text: "They had been friends for years." },
    { date: "2024-06-22", text: "It's a beautiful day, isn't it?" },
    { date: "2024-06-25", text: "The evidence was clear and undeniable." },
    { date: "2024-06-28", text: "He couldn't shake the feeling of déjà vu." },
    { date: "2024-07-02", text: "We must act now to save the planet." },
    { date: "2024-07-05", text: "In the end, it was all worth it." },
    { date: "2024-07-09", text: "This is just the beginning of the story." },
    // 추가적인 문장 데이터...
  ];

  const words = [
    { english: "honeydew", korean: "허니듀 멜론" },
    { english: "kiwi", korean: "키위" },
    { english: "lemon", korean: "레몬" },
    { english: "mango", korean: "망고" },
    { english: "nectarine", korean: "넥타린" },
    { english: "orange", korean: "오렌지" },
    { english: "pear", korean: "배" },
    { english: "quince", korean: "모과" },
    { english: "raspberry", korean: "산딸기" },
    { english: "strawberry", korean: "딸기" },
    { english: "tangerine", korean: "귤" },
    { english: "apple", korean: "사과" },
    { english: "banana", korean: "바나나" },
    { english: "cherry", korean: "체리" },
    { english: "date", korean: "대추" },
    { english: "eggplant", korean: "가지" },
    { english: "fig", korean: "무화과" },
    { english: "grape", korean: "포도" },
    { english: "honeydew", korean: "허니듀 멜론" },
    { english: "kiwi", korean: "키위" },
    { english: "lemon", korean: "레몬" },
    { english: "mango", korean: "망고" },
    { english: "nectarine", korean: "넥타린" },
    { english: "orange", korean: "오렌지" },
    { english: "pear", korean: "배" },
    { english: "quince", korean: "모과" },
    { english: "raspberry", korean: "산딸기" },
    { english: "strawberry", korean: "딸기" },
    { english: "tangerine", korean: "귤" },
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
