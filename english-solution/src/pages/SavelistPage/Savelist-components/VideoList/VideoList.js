// src/components/VideoList.js
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Video from "./Video";
import Pagination from "../../../../components/Pagination/Pagination";
import { Box, Container } from "@mui/material";

const VideoList = ({ videos }) => {
  // const [videos, setVideos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const videosPerPage = 6;
  const pagesVisited = pageNumber * videosPerPage;

  const displayVideos = videos
    .slice(pagesVisited, pagesVisited + videosPerPage)
    .map((video) => <Video key={video.id} video={video} />);

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
