// MainPage.js

import React from "react";
import InsertLink from "../../components/InsertLink/InsertLink";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();

  const handleLinkSubmit = (link) => {
    // 링크를 사용하여 videoId를 추출하는 로직
    const videoId = extractVideoIdFromLink(link);
    if (videoId) {
      navigate(`/video/${videoId}`);
    }
  };

  const extractVideoIdFromLink = (link) => {
    // YouTube 링크에서 videoId 추출
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = link.match(regex);
    return match && match[1];
  };

  return (
    <div className="main-page">
      <main>
        <InsertLink onLinkSubmit={handleLinkSubmit} />
      </main>
    </div>
  );
};

export default MainPage;
