// src/Savelist-components/WordList.js
import React, { useState } from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "../../../../components/Pagination/Pagination";
import Word from "./Word";

const WordList = ({ words }) => {
  const [page, setPage] = useState(1);
  const wordsPerPage = 20;

  const startIndex = (page - 1) * wordsPerPage;
  const endIndex = startIndex + wordsPerPage;
  const currentWords = words.slice(startIndex, endIndex);

  const handleChangePage = ({ selected }) => {
    setPage(selected + 1);
  };

  return (
    <Container className="list-container">
      <Box className="word-list">
        {currentWords.map((word, index) => (
          <Word key={index} word={word} />
        ))}
      </Box>
      <Box className="pagination-container">
        <Pagination
          pageCount={Math.ceil(words.length / wordsPerPage)}
          changePage={handleChangePage}
        />
      </Box>
    </Container>
  );
};

export default WordList;
