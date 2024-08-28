import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DescriptionDetail from "./DescriptionDetail";
import "../VideoPage.css";

const baseURL = "http://15.165.135.23";

const Description = ({ sentence }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sentence) {
      console.log(sentence);
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.post(
            `/sentence`,
            { sentence: sentence },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("서버 응답:", response);

          const result = response.data.reply
            ? JSON.parse(response.data.reply)
            : {};

          // result가 비어있거나 유효하지 않더라도 setData를 사용
          setData(result);
          setError(null);
        } catch (error) {
          console.error("Fetching error:", error);
          setData({}); // 에러 발생 시에도 빈 객체를 설정
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setData({}); // 문장이 제공되지 않으면 빈 객체 설정
      setLoading(false);
    }
  }, [sentence]);

  if (loading) {
    return (
      <Box className="description-container">
        <CircularProgress />
      </Box>
    );
  }

  // 데이터가 없을 경우 아무것도 렌더링하지 않거나 기본 메시지 표시
  if (!data || (Object.keys(data).length === 0 && !error)) {
    return (
      <Box className="description-container">
        <Typography>데이터가 없습니다.</Typography>
      </Box>
    );
  }

  const words = data.word || [];
  const grammar = data.grammar || [];
  const idioms = data.idioms || [];

  return (
    <Box className="description-container">
      <div className="sentence-container">{sentence}</div>
      <DescriptionDetail title="주요 단어" items={words} columns={2} />
      <DescriptionDetail title="문법" items={grammar} columns={1} />
      <DescriptionDetail title="관용어구" items={idioms} columns={1} />
    </Box>
  );
};

export default Description;
