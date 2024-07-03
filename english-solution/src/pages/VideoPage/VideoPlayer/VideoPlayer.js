// VideoPlayer.js 파일 내용 예시

import React from "react";
import { Box } from "@mui/material";

const VideoPlayer = ({ videoId }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <Box flex={2} marginRight={2} className="video-player">
      <iframe
        width="100%"
        height="550"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Box>
  );
};

export default VideoPlayer; // default export 설정
