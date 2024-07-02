import { Box } from "@mui/material";
import React from "react";

const VideoPlayer = ({ videoId }) => {
  // 제공된 videoId를 사용하여 YouTube 임베드 URL을 구성
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

export default VideoPlayer;
