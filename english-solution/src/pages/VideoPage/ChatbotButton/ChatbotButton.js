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
      variant="contained"
      className="chatbot-button"
      label="영상 관련 챗봇과 대화하기"
      onClick={goToChatbot}
    />
  );
};

export default ChatbotButton;
