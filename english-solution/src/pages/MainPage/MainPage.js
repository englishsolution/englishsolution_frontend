// MainPage: 링크 삽입 페이지

import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate("/video-page");
  };

  return (
    <div className="main-page">
      <header></header>
      <main>
        <button onClick={handlePlayClick} className="play-button">
          재생
        </button>{" "}
      </main>
    </div>
  ); // 재생버튼: 임시로 만듬, 컴포넌트로 변경 필요
};

export default MainPage;
