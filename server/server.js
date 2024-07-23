// 스피킹 페이지 서버 테스트용

const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 8000;

// CORS 설정
app.use(cors());

// Multer 설정
const upload = multer({ dest: "uploads/" });

// 파일 업로드 처리
app.post("/processing_speaking", upload.single("audio"), (req, res) => {
  console.log("Uploaded file:", req.file);
  res.json({ score: 90, message: "Audio file processed successfully." });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
