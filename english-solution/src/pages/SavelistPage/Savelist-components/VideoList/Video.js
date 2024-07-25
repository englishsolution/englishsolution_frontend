import React from "react";
import { useNavigate } from "react-router-dom";

const Video = ({ video }) => {
  const navigate = useNavigate();

  const handleImgClick = () => {
    navigate(`/video/${video.video_id}`);
  };

  const handleSentenceClick = () => {
    navigate(`/save-list/sentences/${video.video_id}`);
  };

  const handleWordClick = () => {
    navigate(`/save-list/words/${video.video_id}`);
  };

  return (
    <div className="video">
      <img
        src={video.img}
        alt={video.title}
        className="video-thumbnail"
        onClick={handleImgClick}
      />
      <h3 className="video-title">{video.title}</h3>
      <div className="video-btns">
        <button className="video-btns__sentences" onClick={handleSentenceClick}>
          문장 보기
        </button>
        <button className="video-btns__words" onClick={handleWordClick}>
          단어 보기
        </button>
      </div>
    </div>
  );
};

export default Video;
