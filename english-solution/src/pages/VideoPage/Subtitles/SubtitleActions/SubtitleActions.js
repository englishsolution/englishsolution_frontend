import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import SentenceConfirm from "../../../../components/ConfirmDialog/SentenceConfirm";
import SpeakingTestButton from "../../SpeakingModal/SpeakingTestButton";

/**
 * 자막 저장 및 스피킹 테스트 버튼을 관리하는 컴포넌트
 * @param {Object} props - 컴포넌트의 속성
 * @param {Object} props.subtitle - 현재 자막 정보 (영어 및 한국어 자막)
 * @param {string} props.videoId - 현재 비디오 ID
 */
const SubtitleActions = ({ subtitle = {}, videoId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  /**
   * 자막을 서버에 저장하는 함수
   */
  const saveSubtitlesToDatabase = async () => {
    try {
      await axios.post("/api/save-subtitle", {
        sentence_eg: subtitle.englishSubtitle || "", // 영어 자막 텍스트
        sentence_kr: subtitle.koreanSubtitle || "", // 한국어 자막 텍스트
        save_date: new Date().toISOString(), // 현재 날짜와 시간
        video: videoId, // 비디오 ID
      });

      console.log("Subtitle saved successfully.");
      setIsSaved(true); // 저장 완료 상태로 업데이트
      closeDialog(); // 저장 후 Modal 닫기
    } catch (error) {
      console.error("Error saving subtitles:", error);
      alert("Failed to save subtitles. Please try again.");
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={openDialog} disabled={isSaved}>
        {isSaved ? "Saved" : "Save"}
      </Button>

      <SentenceConfirm
        open={isOpen}
        onClose={closeDialog}
        onConfirm={saveSubtitlesToDatabase}
        subtitle={subtitle} // 현재 자막 정보 전달
      />

      <SpeakingTestButton subtitle={subtitle} />
    </>
  );
};

export default SubtitleActions;
