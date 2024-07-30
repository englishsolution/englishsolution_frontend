import "./App.css";
import React from "react";
import { useParams } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import VideoPage from "./pages/VideoPage/VideoPage";
import ServiceMenu from "./components/ServiceMenu/ServiceMenu";
import ServiceIntro from "./pages/ServiceIntro/ServiceIntro";
import UsageGuide from "./pages/UsageGuide/UsageGuide";
import Learning from "./pages/Learning/Learning";
import FakeChatbot from "./pages/FakeChatbot/FakeChatbot";
import Header from "./components/Header/Header";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SavelistPage from "./pages/SavelistPage/SavelistPage";
import SentenceList from "./pages/SavelistPage/Savelist-components/SentenceList/SentenceList";
import WordList from "./pages/SavelistPage/Savelist-components/WordList/WordList";
import WordQuiz from "./pages/Learning/WordQuiz";
import SentenceQuiz from "./pages/Learning/SentenceQuiz";

import mockData from "./mockData";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <ServiceMenu />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <Route path="/service-intro" element={<ServiceIntro />} />
          <Route path="/usage-guide" element={<UsageGuide />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/chatbot" element={<FakeChatbot />} />
          <Route path="/save-list" element={<SavelistPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route
            path="/save-list/sentences/:videoId"
            element={<SentenceListWrapper />}
          />
          <Route
            path="/save-list/words/:videoId"
            element={<WordListWrapper />}
          />
          <Route path="learning/word-quiz" element={<WordQuiz />} />
          <Route path="learning/sentence-quiz" element={<SentenceQuiz />} />
        </Routes>
      </div>
    </Router>
  );
};

const SentenceListWrapper = () => {
  const { videoId } = useParams();
  const video = mockData.find((video) => video.video_id === videoId);

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div>
      <h1>{video.title} - 문장 모음</h1>
      <SentenceList sentences={video.sentences} />
    </div>
  );
};

const WordListWrapper = () => {
  const { videoId } = useParams();
  const video = mockData.find((video) => video.video_id === videoId);

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div>
      <h1>{video.title} - 단어 모음</h1>
      <WordList words={video.words} />
    </div>
  );
};

export default App;
