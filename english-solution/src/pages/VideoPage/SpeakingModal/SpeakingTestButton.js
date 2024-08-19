import React, { useState } from "react";
import Button from "@mui/material/Button";
import SpeakingModal from "./SpeakingModal";

/**
 * 스피킹 테스트 버튼과 모달을 관리하는 컴포넌트
 * @param {Object} props - 컴포넌트의 속성
 * @param {Object} props.subtitle - 현재 자막 정보
 */
const SpeakingTestButton = ({ subtitle }) => {
  // 스피킹 모달 상태 관리
  const [isSpeakingModalOpen, setIsSpeakingModalOpen] = useState(false);

  // 스피킹 모달 열기 함수
  const openSpeakingModal = () => {
    setIsSpeakingModalOpen(true);
  };

  // 스피킹 모달 닫기 함수
  const closeSpeakingModal = () => {
    setIsSpeakingModalOpen(false);
  };

  return (
    <>
      {/* 스피킹 테스트 모달 버튼 */}
      <Button variant="outlined" onClick={openSpeakingModal}>
        🎤
      </Button>

      {/* 스피킹 테스트 모달 */}
      <SpeakingModal
        open={isSpeakingModalOpen}
        handleClose={closeSpeakingModal}
        subtitle={subtitle}
      />
    </>
  );
};

export default SpeakingTestButton;
