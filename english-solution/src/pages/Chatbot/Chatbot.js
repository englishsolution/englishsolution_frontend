import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Chatbot.css"; // Chatbot 스타일링 파일

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [csrftoken, setCsrfToken] = useState("");
  const [currentMode, setCurrentMode] = useState("general");
  const [difficulty, setDifficulty] = useState("easy");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  useEffect(() => {
    setCsrfToken(Cookies.get("csrftoken"));
  }, []);

  useEffect(() => {
    const messagesEnd = document.getElementById("messages-end");
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    setLoading(true); // 로딩 시작

    const requestData = {
      method: "post",
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
          const botReplies = Array.isArray(data.reply) ? data.reply : [];
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputText, sender: "user" },
            ...botReplies.map((reply, index) => ({
              text: reply,
              sender: "bot",
              key: index,
            })),
          ]);
          setInputText(""); // 입력 필드 초기화
          setError(""); // 오류 메시지 초기화
        }
        setLoading(false); // 로딩 종료
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setError("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
        setLoading(false); // 로딩 종료
      });
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
      {loading && <div className="loading-message">로딩 중...</div>} {/* 로딩 메시지 추가 */}

      <div className="button-container">
        <button
          className="chatbot-button wordbutton"
          onClick={() => {
            setCurrentMode("word");
            setDifficulty("advanced");
          }}
        >
          Word (상)
        </button>
        <button
          className="chatbot-button wordbutton"
          onClick={() => {
            setCurrentMode("word");
            setDifficulty("intermediate");
          }}
        >
          Word (중)
        </button>
        <button
          className="chatbot-button wordbutton"
          onClick={() => {
            setCurrentMode("word");
            setDifficulty("easy");
          }}
        >
          Word (하)
        </button>
        <button
          className="chatbot-button speakingbutton"
          onClick={() => {
            setCurrentMode("topic");
            sendMessage();
          }}
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
          onClick={() => {
            setCurrentMode("general");
            sendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
