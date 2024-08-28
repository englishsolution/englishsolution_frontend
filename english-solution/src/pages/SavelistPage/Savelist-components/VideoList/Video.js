import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Video = ({ video }) => {
  const navigate = useNavigate();

  const handleImgClick = () => {
    navigate(`/video/${video.video_identify}`);
  };

  const formattedDate = new Date(video.save_date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        border: "1px solid lightgrey",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "12px",
        maxWidth: "300px",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          "&:hover .video-thumbnail": {
            transform: "scale(1.1)",
          },
        }}
      >
        <img
          src={video.img}
          alt={video.title}
          style={{
            margin: "5px",
            height: "120px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "transform 0.3s ease", // Transition for smooth scaling effect
          }}
          onClick={handleImgClick}
          className="video-thumbnail"
        />
      </Box>
      <Typography
        className="video-title"
        sx={{
          fontSize: "18px",
          fontWeight: 500,
          color: "#333",
          marginTop: "8px",
          lineHeight: "120%",
          transition: "color 0.3s ease",
          marginBottom: "18px", // Transition for smooth color change effect
        }}
      >
        {video.title}
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          color: "#888",
          marginTop: "4px",
        }}
      >
        {formattedDate}
      </Typography>
    </Box>
  );
};

export default Video;
