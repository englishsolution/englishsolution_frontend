// src/components/SubtitleActions.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import SpeakingModal from "../../SpeakingModal/SpeakingModal";

const SubtitleActions = ({ subtitle }) => {
  // Modal 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  // 자막 저장 상태 관리
  const [isSaved, setIsSaved] = useState(false);

  // subtitle이 변경될 때마다 저장 상태를 초기화
  useEffect(() => {
    setIsSaved(false);
  }, [subtitle]);

  // 자막을 서버에 저장하는 함수
  const sentenceSave = async () => {
    try {
      // 서버에 자막 데이터를 POST 요청으로 전송
      await axios.post("/api/save-subtitle", { subtitle });

      // 요청이 성공하면 콘솔에 메시지를 출력하고, 버튼 상태를 저장 완료로 업데이트
      console.log("Subtitle saved successfully:", subtitle);
      setIsSaved(true); // 저장 완료 상태로 업데이트
    } catch (error) {
      // 요청이 실패하면 에러 메시지를 콘솔에 출력하고, 사용자에게 알림
      console.error("Error saving subtitle:", error);
      alert("Failed to save subtitle. Please try again.");
    }
  };

  // Modal 열기 함수
  const openModal = () => {
    setIsOpen(true);
  };

  // Modal 닫기 함수
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <span className="subtitle-actions">
      <Button variant="outlined" onClick={sentenceSave} disabled={isSaved}>
        {isSaved ? "Saved" : "⭐"}
      </Button>

      <Button variant="outlined" onClick={openModal}>
        🎤
      </Button>

      <SpeakingModal
        open={isOpen}
        handleClose={closeModal}
        subtitle={subtitle}
      />
    </span>
  );
};

export default SubtitleActions;
