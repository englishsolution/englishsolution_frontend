// DescriptionToggleButton.js
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Description from "./Description";

/**
 * Description을 보여주는 버튼 컴포넌트
 * @param {Object} props - 컴포넌트의 속성
 * @param {Object} props.subtitle - 자막 정보 (영어 및 한국어 자막)
 */
const DescriptionToggleButton = ({ subtitle }) => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription((prev) => !prev); // 토글 상태 업데이트
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleDescription}>
        {showDescription ? "Hide Description" : "Show Description"}
      </Button>

      {showDescription && (
        <div
          style={{
            position: "fixed",
            top: "15vh",
            right: 0,
            width: "25vw", // 화면 가로의 1/4
            height: "80vh",
            zIndex: 1000,
            backgroundColor: "white",
            border: "1px solid #ccc",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            overflowY: "auto", // 내용이 많을 경우 스크롤 가능
          }}
        >
          <Description subtitle={subtitle} />
        </div>
      )}
    </div>
  );
};

export default DescriptionToggleButton;
