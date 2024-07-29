// VideoPlayer.js
import React, { useRef } from "react";
import "./VideoPlayer.css";
import ReactPlayer from "react-player/youtube";
import Subtitles from "../Subtitles/Subtitles";

const VideoPlayer = ({ videoId }) => {
  const playerRef = useRef(null);

  return (
    <div className="video-player">
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/watch?v=${videoId}`}
        controls
        width="100%"
        height="500px"
      />
      <Subtitles videoId={videoId} playerRef={playerRef} />
    </div>
  );
};

export default VideoPlayer; // default export 설정
