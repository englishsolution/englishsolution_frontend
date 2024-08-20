import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Chatbot.css"; // Chatbot 스타일링 파일

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [csrftoken, setCsrfToken] = useState("");
  const [currentMode, setCurrentMode] = useState("general");
  const [difficulty, setDifficulty] = useState("easy"); // 기본 난이도를 easy로 설정

  useEffect(() => {
    setCsrfToken(Cookies.get("csrftoken"));
  }, []);

  const sendMessage = () => {
    if (inputText.trim() === "") return;

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
          // 서버에서 오류가 발생한 경우
          console.error("Server error:", data.error);
          // 사용자에게 오류를 알려줄 수 있는 UI 처리 필요
        } else {
          const botReplies = data.reply; // 서버에서 응답을 받아옴
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
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        // 사용자에게 네트워크 오류를 알려줄 수 있는 UI 처리 필요
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
      </div>

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
