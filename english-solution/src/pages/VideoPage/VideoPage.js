// VideoPage: 영상 시청 페이지
import React from "react";
import Header from "../../components/Header/Header";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import Subtitles from "./Subtitles/Subtitles";
import "./VideoPage.css";
import ChatbotButton from "./ChatbotButton/ChatbotButton";
import Description from "./Description/Description";
import { Grid } from "@mui/material";

const recievedId = "iz8CuDdKVh4";

const VideoPage = () => {
  return (
    <div className="video-page">
      <header>
        <Header />
      </header>
      <main>
        <Grid></Grid>
        <VideoPlayer videoId={recievedId} />
        <Subtitles videoId={recievedId} />
        <ChatbotButton />
        <Description />
      </main>
    </div>
  );
};

export default VideoPage;
