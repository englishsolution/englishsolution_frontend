import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [csrftoken, setCsrfToken] = useState("");
  const [currentMode, setCurrentMode] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null); // 서버에서 반환된 비디오 데이터 상태 추가

  useEffect(() => {
    const token = Cookies.get("csrftoken");
    setCsrfToken(token);
  }, []);

  useEffect(() => {
    const messagesEnd = document.getElementById("messages-end");
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (currentMode && videoData) {
      if (currentMode === "topic") {
        // 서버에서 비디오 정보를 가져온 후 챗봇이 메시지를 추가합니다.
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "영상에 관한 어떤 이야기를 해 볼까요?", sender: "reply" },
        ]);
      } else {
        const userMessage =
          currentMode === "word"
            ? `Word (${difficulty})`
            : `${currentMode} 선택`;
        sendMessage(userMessage);
      }
    }
  }, [currentMode, difficulty, videoData]);

  const sendMessage = (userMessage = null) => {
    if (inputText.trim() === "" && currentMode === "general" && !userMessage)
      return;

    setLoading(true);

    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        mode: currentMode,
        prompt: currentMode === "general" ? inputText : undefined,
        difficulty: currentMode === "word" ? difficulty : undefined,
        video_title: currentMode === "topic" ? inputText : undefined,
      }),
    };

    fetch("http://15.165.135.23/chatbot", requestData)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setError("서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
        } else {
          if (currentMode === "topic") {
            // 비디오 정보와 스크립트를 상태에 저장
            setVideoData(data);
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: `비디오 제목: ${data.title}`, sender: "reply" },
              { text: `비디오 URL: ${data.url}`, sender: "reply" },
              { text: `스크립트: ${data.script}`, sender: "reply" },
            ]);
          } else {
            const botReplies = Array.isArray(data.reply)
              ? data.reply
              : [data.reply];
            setMessages((prevMessages) => [
              ...prevMessages,
              ...(userMessage
                ? [{ text: userMessage, sender: "user" }]
                : [{ text: inputText, sender: "user" }]),
              ...botReplies.map((reply, index) => ({
                text: reply,
                sender: "reply",
                key: index,
              })),
            ]);
          }
          setInputText("");
          setError("");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setError("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
        setLoading(false);
      });
  };

  const handleButtonClick = (mode, difficulty = "") => {
    setCurrentMode(mode);
    setDifficulty(difficulty);
    if (mode === "topic") {
      // 영상주제 버튼 클릭 시 서버에서 비디오 정보를 가져옵니다.
      sendMessage();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}
        <div id="messages-end" />
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">로딩 중...</div>}

      <div className="button-container">
        <button
          className="chatbot-button wordbutton"
          onClick={() => handleButtonClick("word", "advanced")}
        >
          Word (상)
        </button>
        <button
          className="chatbot-button wordbutton"
          onClick={() => handleButtonClick("word", "intermediate")}
        >
          Word (중)
        </button>
        <button
          className="chatbot-button wordbutton"
          onClick={() => handleButtonClick("word", "easy")}
        >
          Word (하)
        </button>
        <button
          className="chatbot-button speakingbutton"
          onClick={() => handleButtonClick("topic")}
        >
          영상주제
        </button>
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          placeholder="무엇이든 물어보세요!"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="chatbot-input"
        />
        <button
          className="chatbot-button"
          onClick={() => handleButtonClick("general")}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
