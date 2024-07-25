// src/Savelist-components/SentenceList.js
import React, { useState } from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Sentence from "./Sentence";
import Pagination from "../../../../components/Pagination/Pagination";

const SentenceList = ({ sentences }) => {
  const [page, setPage] = useState(1);
  const sentencesPerPage = 10;

  const startIndex = (page - 1) * sentencesPerPage;
  const endIndex = startIndex + sentencesPerPage;
  const currentSentences = sentences.slice(startIndex, endIndex);

  const handleChangePage = ({ selected }) => {
    setPage(selected + 1);
  };

  return (
    <Container className="list-container">
      <Box className="sentence-list">
        {currentSentences.map((sentence, index) => (
          <Sentence key={index} sentence={sentence} />
        ))}
      </Box>

      <Box className="pagination-container">
        <Pagination
          pageCount={Math.ceil(sentences.length / sentencesPerPage)}
          changePage={handleChangePage}
        />
      </Box>
    </Container>
  );
};

export default SentenceList;
