// 스피킹 테스트 페이지
import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

const SpeakingModal = ({ open, handleClose, subtitle }) => {
  const [audioData, setAudioData] = useState(null); // 오디오 데이터 상태
  const [audioUrl, setAudioUrl] = useState(null); // 오디오 URL 상태
  const [score, setScore] = useState(null); // 평가 점수 상태
  const [message, setMessage] = useState(""); // 서버에서 받은 메시지 상태
  const [error, setError] = useState(""); // 에러 메시지 상태
  const mediaRecorderRef = useRef(null); // MediaRecorder 참조
  const audioChunksRef = useRef([]); // 녹음된 오디오 청크 저장

  // 녹음 시작 함수
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioData(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
    });
  };

  // 녹음 중지 함수
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  // 서버로 오디오 파일 전송 및 결과 처리
  const handleSubmit = async () => {
    if (audioData) {
      const formData = new FormData();
      formData.append("audio", audioData, "recording.wav");
      formData.append("script", subtitle.text); // 스크립트 텍스트도 함께 전송

      try {
        const response = await fetch(
          "http://localhost:8000/processing_speaking/", // 실제 서버 주소로 교체 필요
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setScore(data.score || null); // 서버로부터 받은 점수 설정
          setMessage(data.message || "No message received."); // 서버로부터 받은 메시지 설정
          setError("");
        } else {
          setError("Failed to process the audio file.");
          setScore(null);
          setMessage("");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Error submitting the audio file.");
        setScore(null);
        setMessage("");
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          height: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 id="modal-subtitle">{subtitle.text}</h2>

        <div>
          <Button onClick={startRecording}>녹음 시작</Button>
          <Button onClick={stopRecording}>중지</Button>
        </div>
        {audioUrl && (
          <div>
            <audio controls src={audioUrl}></audio>
          </div>
        )}
        <Button onClick={handleSubmit}>제출</Button>

        {score !== null && <p id="modal-score">점수: {score}점</p>}
        {message && <p id="modal-message">{message}</p>}
        {error && (
          <p id="modal-error" style={{ color: "red" }}>
            {error}
          </p>
        )}

        <Button onClick={handleClose}>닫기</Button>
      </Box>
    </Modal>
  );
};

export default SpeakingModal;
