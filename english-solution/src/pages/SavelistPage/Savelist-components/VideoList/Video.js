import React from "react";
import { useNavigate } from "react-router-dom";

const Video = ({ video }) => {
  const navigate = useNavigate();

  const handleImgClick = () => {
    navigate(`/video/${video.video_identify}`);
  };

  const formattedDate = new Date(video.save_date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  console.log(video);

  return (
    <div className="video">
      <img
        src={video.img}
        alt={video.title}
        className="video-thumbnail"
        onClick={handleImgClick}
      />
      <h3 className="video-title">{video.title}</h3>
      <p className="video-date">{formattedDate}</p>
    </div>
  );
};

export default Video;
