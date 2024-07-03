// MainPage.js

import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import InsertLink from "../../components/InsertLink/InsertLink";
import VideoPlayer from "../../pages/VideoPage/VideoPlayer/VideoPlayer"; // 예시 경로, 실제 경로에 맞게 수정 필요
import ServiceMenu from "../../components/ServiceMenu/ServiceMenu"; // 추가된 부분
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();
  const [videoId, setVideoId] = useState(null);

  const handleLinkSubmit = (link) => {
    // 링크를 사용하여 videoId를 추출하는 로직
    const videoId = extractVideoIdFromLink(link);
    setVideoId(videoId);
  };

  const extractVideoIdFromLink = (link) => {
    // YouTube 링크에서 videoId 추출
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = link.match(regex);
    return match && match[1];
  };

  return (
    <div className="main-page">
      <header>
        <Header />
      </header>

      <main>
        <ServiceMenu /> {/* 추가된 서비스 메뉴 */}
        <InsertLink onLinkSubmit={handleLinkSubmit} />

        {videoId && <VideoPlayer videoId={videoId} />}
      </main>
    </div>
  );
};

export default MainPage;
