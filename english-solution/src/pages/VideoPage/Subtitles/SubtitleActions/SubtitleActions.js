import React, { useState } from "react";
import Button from "@mui/material/Button";
import SpeakingTestButton from "./SpeakingTestButton";
import DescriptionToggleButton from "../../Description/DescriptionToggleButton";
import SentenceSave from "../SentenceSave/SentenceSave";

/**
 * 자막 저장 및 스피킹 테스트 버튼을 관리하는 컴포넌트
 * @param {Object} props - 컴포넌트의 속성
 * @param {Object} props.subtitle - 현재 자막 정보 (영어 및 한국어 자막)
 * @param {string} props.videoId - 현재 비디오 ID
 */

const SubtitleActions = ({ subtitle, videoId }) => {
  return (
    <>
      <div style={{ display: "flex", gap: "8px" }}>
        <SentenceSave sentence={subtitle.englishSubtitle} videoId={videoId} />

        <SpeakingTestButton subtitle={subtitle.englishSubtitle} />

        <DescriptionToggleButton sentence={subtitle.englishSubtitle} />
      </div>
    </>
  );
};

export default SubtitleActions;
