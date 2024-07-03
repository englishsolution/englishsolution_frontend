import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";

const ChatbotButton = () => {
  const navigate = useNavigate();

  const goToChatbot = () => {
    navigate("/chatbot");
  };

  return (
    <Button
      style={{
        position: "fixed",
        bottom: "100px",
        right: "100px",
        zIndex: 1000,
      }}
      label="챗봇과 대화하기"
      onClick={goToChatbot}
    />
  );
};

export default ChatbotButton;
