// VideoPlayer.js

import "./VideoPlayer.css";
import ReactPlayer from "react-player/youtube";

const VideoPlayer = ({ videoId }) => {
  return (
    <div className="video-player">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        controls
        width="100%"
        height="500px"
      />
    </div>
  );
};

export default VideoPlayer; // default export 설정
