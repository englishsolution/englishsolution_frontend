// src/pages/Learning/Learning.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import mockData from '../../mockData'; // 경로 수정
import './Learning.css'; // CSS 파일 경로

const Learning = () => {
  const navigate = useNavigate();

  // mockData에서 비디오 제목만 추출
  const videoTitles = mockData.map(video => video);

  // 제목 박스를 클릭했을 때 호출되는 함수
  const handleBoxClick = (videoId) => {
    navigate(`/quiz/${videoId}`);
  };

  return (
    <div className="learning-container">
      <h1 className="learning-title">Saved Video Titles</h1>
      <div className="learning-list">
        {videoTitles.map((video) => (
          <div
            key={video.video_id}
            className="learning-item"
            onClick={() => handleBoxClick(video.video_id)}
          >
            {video.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;
