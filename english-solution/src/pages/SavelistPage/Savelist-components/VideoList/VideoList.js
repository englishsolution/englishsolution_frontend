import React, { useState } from "react";
import Video from "./Video";
import Pagination from "../../../../components/Pagination/Pagination";
import { Box, Container } from "@mui/material";

const VideoList = ({ videos }) => {
  // 이제 mockData를 사용하지 않고, 부모 컴포넌트로부터 전달된 videos를 사용합니다.
  const [pageNumber, setPageNumber] = useState(0);
  const videosPerPage = 6;
  const pagesVisited = pageNumber * videosPerPage;

  const displayVideos = videos
    .slice(pagesVisited, pagesVisited + videosPerPage)
    .map((video) => <Video key={video.video_id} video={video} />);

  const pageCount = Math.ceil(videos.length / videosPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Container className="list-container">
      <Box className="video-list">{displayVideos}</Box>
      <Box className="pagination-container">
        <Pagination pageCount={pageCount} changePage={changePage} />
      </Box>
    </Container>
  );
};

export default VideoList;
