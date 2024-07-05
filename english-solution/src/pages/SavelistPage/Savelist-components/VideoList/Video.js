import React from "react";

const Video = ({ video }) => {
  return (
    <div className="video">
      <img src={video.thumbnail} alt={video.title} />
      <h3>{video.title}</h3>
    </div>
  );
};

export default Video;
