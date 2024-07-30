// src/pages/Learning/Learning.js
import React from 'react';
import mockData from '../../mockData'; // 경로를 src/mockData.js로 수정합니다
import './Learning.css'; // CSS 파일 경로

const Learning = () => {
  // mockData에서 비디오 제목만 추출
  const videoTitles = mockData.map(video => video.title);

  return (
    <div className="learning-container">
      <h1 className="learning-title">Saved Video Titles</h1>
      <ul className="learning-list">
        {videoTitles.map((title, index) => (
          <li key={index} className="learning-item">
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Learning;
