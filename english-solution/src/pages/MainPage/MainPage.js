import React from 'react';
import { useAuth } from '../AuthContext/AuthContext'; // useAuth import
import InsertLink from '../../components/InsertLink/InsertLink';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth(); // 로그인 상태를 가져옵니다.

  const handleLinkSubmit = (link) => {
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
        {auth ? (
          <InsertLink onLinkSubmit={handleLinkSubmit} />
        ) : (
          <div className="login-prompt">
            <p>로그인 후 이용해주세요.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
