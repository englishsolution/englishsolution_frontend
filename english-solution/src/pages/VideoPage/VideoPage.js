// VideoPage: 영상 시청 페이지
import React from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../../pages/VideoPage/VideoPlayer/VideoPlayer";
import Description from "./Description/Description";
import { Container, Box, Grid } from "@mui/material";
import ChatbotButton from "./ChatbotButton/ChatbotButton";

const VideoPage = () => {
  const { videoId } = useParams();

  return (
    <Container
      maxWidth="lg"
      style={{
        minHeight: "80vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box paddingTop={2} flex={1} display="flex" style={{ height: "100vh" }}>
        <Grid container spacing={2} style={{ flex: 1 }}>
          <Grid
            item
            xs={9}
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <VideoPlayer videoId={videoId} />
          </Grid>
          <Grid
            item
            xs={3}
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              height: "100%",
            }}
          >
            <Description />
          </Grid>
        </Grid>
      </Box>
      {/* <Box className="chatbot-button-container">
        <ChatbotButton />
      </Box> */}
    </Container>
  );
};

export default VideoPage;
