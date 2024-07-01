// VideoPage: 영상 시청 페이지
import React from "react";
import Header from "../../components/Header/Header";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import Subtitles from "./Subtitles/Subtitles";
import "./VideoPage.css";
import ChatbotButton from "./ChatbotButton/ChatbotButton";

const VideoPage = () => {
  return (
    <div className="video-page">
      <header>
        <Header />
      </header>
      <main>
        <VideoPlayer videoId="iz8CuDdKVh4" />
        <Subtitles videoId="iz8CuDdKVh4" />
        <ChatbotButton />
      </main>
    </div>
  );
};

export default VideoPage;
