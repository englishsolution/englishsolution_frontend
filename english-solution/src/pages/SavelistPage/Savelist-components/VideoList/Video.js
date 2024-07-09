import React from "react";

const Video = ({ video }) => {
  return (
    <div className="video">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="video-thumbnail"
      />
      <h3 className="video-title">{video.title}</h3>
    </div>
  );
};

export default Video;
