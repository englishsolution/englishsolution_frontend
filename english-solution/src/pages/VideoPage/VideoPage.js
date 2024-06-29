// VideoPage: 영상 시청 페이지
import React from "react";
import Header from "../../components/Header/Header";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import Subtitle from "./Subtitle/Subtitle";
import "./VideoPage.css";

const VideoPage = () => {
  return (
    <div className="video-page">
      <header>
        <Header />
      </header>
      <main>
        <VideoPlayer videoId="iz8CuDdKVh4" />
        <Subtitle />
      </main>
    </div>
  );
};

export default VideoPage;
