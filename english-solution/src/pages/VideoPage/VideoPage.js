// VideoPage: 영상 시청 페이지
import React from "react";
import Header from "../../components/Header/Header";
import VideoPlayer from "../../pages/VideoPage/VideoPlayer/VideoPlayer";
import Subtitles from "./Subtitles/Subtitles";
import ChatbotButton from "./ChatbotButton/ChatbotButton";
import Description from "./Description/Description";
import { Container, Box, Grid } from "@mui/material";

const VideoPage = () => {
  const recievedId = "iz8CuDdKVh4";
  return (
    <Container
      maxWidth="lg"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box paddingTop={2} flex={1} display="flex">
        <Grid container spacing={2} style={{ flex: 1 }}>
          <Grid
            item
            xs={9}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <VideoPlayer videoId={recievedId} />
            <Subtitles videoId={recievedId} />
          </Grid>
          <Grid
            item
            xs={3}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Description />
          </Grid>
        </Grid>
        <ChatbotButton />
      </Box>
    </Container>
  );
};

export default VideoPage;
