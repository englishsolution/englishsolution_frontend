import React from "react";

const VideoPlayer = ({ videoId }) => {
  // 제공된 videoId를 사용하여 YouTube 임베드 URL을 구성
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-player">
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
