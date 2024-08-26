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

  // 상태가 변경될 때마다 메시지를 전송합니다.
  useEffect(() => {
    if (currentMode) {
      const userMessage = currentMode === "word" ? `Word (${difficulty})` : `${currentMode} 선택`;
      sendMessage(userMessage);
    }
  }, [currentMode, difficulty]);

  const sendMessage = (userMessage = null) => {
    if (inputText.trim() === "" && currentMode === "general" && !userMessage) return;

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
          const botReplies = Array.isArray(data.reply) ? data.reply : [data.reply];
          setMessages((prevMessages) => [
            ...prevMessages,
            ...(userMessage ? [{ text: userMessage, sender: "user" }] : [{ text: inputText, sender: "user" }]),
            ...botReplies.map((reply, index) => ({
              text: reply,
              sender: "reply",
              key: index,
            })),
          ]);
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
