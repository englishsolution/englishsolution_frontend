// src/Savelist-components/SentenceList.js
import React, { useState } from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Sentence from "./Sentence";
import Pagination from "../../../../components/Pagination/Pagination"; // Pagination 컴포넌트를 import합니다.

const SentenceList = ({ sentences }) => {
  // 임시 데이터로 예시 문장들을 정의합니다.

  const [page, setPage] = useState(1); // 현재 페이지 번호를 상태로 관리합니다.
  const sentencesPerPage = 10; // 페이지당 보여질 문장 수를 정의합니다.

  // 현재 페이지에 해당하는 문장들을 계산합니다.
  const startIndex = (page - 1) * sentencesPerPage;
  const endIndex = startIndex + sentencesPerPage;
  const currentSentences = sentences.slice(startIndex, endIndex);

  // 페이지 변경 시 호출될 함수를 정의합니다.
  const handleChangePage = ({ selected }) => {
    setPage(selected + 1); // react-paginate의 selected 값이 0부터 시작하므로 1을 더해줍니다.
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
