import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DescriptionDetail from "./DescriptionDetail";
import "../VideoPage.css";

// Import mock data
import mockDescriptionData from "../../../mock/mockDescriptionData.json";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

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
            "/sentence",
            { sentence },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const result = response.data;

          // If response data is empty or invalid, use mock data
          if (!result || !result.word || !result.grammer || !result.idioms) {
            setData(mockDescriptionData);
          } else {
            setData(result);
          }

          setError(null);
        } catch (error) {
          console.error("Fetching error:", error);
          setData(mockDescriptionData);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setData(mockDescriptionData); // Default to mock data if no sentence is provided
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

  // Uncomment this if you want to show an error message
  /*
  if (error) {
    return (
      <Box className="description-container">
        <Typography color="error">
          문장 데이터를 불러오는 데 실패했습니다. Mock 데이터가 사용됩니다.
        </Typography>
      </Box>
    );
  }
  */

  // Fallback to mock data if no data is available
  const words = data?.word || mockDescriptionData.word;
  const grammar = data?.grammer || mockDescriptionData.grammer;
  const idioms = data?.idioms || mockDescriptionData.idioms;

  return (
    <Box className="description-container">
      <DescriptionDetail title="주요 단어" items={words} />
      <DescriptionDetail title="문법" items={grammar} />
      <DescriptionDetail title="관용어구" items={idioms} />
    </Box>
  );
};

export default Description;
