// src/Savelist-components/WordList.js
import React, { useState } from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "../../../../components/Pagination/Pagination";
import Word from "./Word";

const WordList = ({ words }) => {
  const [page, setPage] = useState(1); // 현재 페이지 번호를 상태로 관리합니다.
  const wordsPerPage = 20; // 페이지당 보여질 단어 수를 정의합니다.

  // 현재 페이지에 해당하는 단어들을 계산합니다.
  const startIndex = (page - 1) * wordsPerPage;
  const endIndex = startIndex + wordsPerPage;
  const currentWords = words.slice(startIndex, endIndex);

  // 페이지 변경 시 호출될 함수를 정의합니다.
  const handleChangePage = ({ selected }) => {
    setPage(selected + 1); // react-paginate의 selected 값이 0부터 시작하므로 1을 더해줍니다.
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
