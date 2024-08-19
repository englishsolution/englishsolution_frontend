import { Box } from "@mui/material";
import React from "react";
import DescriptionDetail from "./DescriptionDetail";
import "../VideoPage.css";

const Description = ({ subtitle }) => {
  // 백엔드 API 연결로 변경 필요

  const keyVocabulary = ["old man: 노인", "Gepetto: 제페토 (인물 이름)"];

  const idioms = [
    "There once was: 한 번은 있었던, 과거에 있었던",
    "named Gepetto: 이름이 제페토인",
  ];

  const grammarStructure = [
    "주어(There) + 서술어(once was) + 목적어(an old man named Gepetto)",
  ];

  return (
    <Box className="description-container">
      <DescriptionDetail title="주요 단어" items={keyVocabulary} />
      <DescriptionDetail title="관용어구" items={idioms} />
      <DescriptionDetail title="문법 구조" items={grammarStructure} />
    </Box>
  );
};

export default Description;
