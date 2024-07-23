// 스피킹 테스트 페이지 (모달)
import React, { useState, useRef } from "react";
import Button from "@mui/material/Button"; // MUI Button import
import Modal from "@mui/material/Modal"; // MUI Modal import
import { Box } from "@mui/material";

const SpeakingModal = ({ open, handleClose, subtitle }) => {
  const [audioData, setAudioData] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [score, setScore] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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
        console.log("Audio Blob Size:", audioBlob.size); // Blob 크기 확인
        setAudioData(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
    });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSubmit = async () => {
    if (audioData) {
      const formData = new FormData();
      formData.append("audio", audioData, "recording.wav");

      try {
        const response = await fetch(
          "http://localhost:8000/processing_speaking/", // 서버 임시 주소
          {
            method: "POST",
            body: formData,
          }
        );

        console.log("Response:", response); // 디버깅을 위한 로그

        if (response.ok) {
          const data = await response.json();
          console.log("Response Data:", data);
          // 서버 응답이 예상한 데이터 형식인지 확인
          setScore(data.score || null);
          setMessage(data.message || "No message received.");
          setError("");
        } else {
          // 서버 응답 구조가 예상과 다른 경우 처리
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
