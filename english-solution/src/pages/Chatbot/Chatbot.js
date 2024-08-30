import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [csrftoken, setCsrfToken] = useState("");
  const [currentMode, setCurrentMode] = useState("general");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoTitles, setVideoTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setCsrfToken(Cookies.get("csrftoken"));
  }, []);

  useEffect(() => {
    const messagesEnd = document.getElementById("messages-end");
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (currentMode === "topic" && selectedTitle === "") {
      fetchVideoTitles();
    }
  }, [currentMode, selectedTitle]);

  const fetchVideoTitles = useCallback(() => {
    setLoading(true);
    fetch("/realtime/videos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setVideoTitles(data.map(item => item.title));
          setShowPopup(true);
        } else {
          setError("영상 제목을 불러오는 중 오류가 발생했습니다.");
        }
      })
      .catch(() => {
        setError("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const sendMessage = useCallback(() => {
    if (
      (inputText.trim() === "" && currentMode === "general") ||
      (currentMode === "topic" && selectedTitle === "")
    ) {
      return;
    }

    setLoading(true);

    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        mode: currentMode,
        prompt: currentMode === "general" || currentMode === "topic" ? inputText : null,
        difficulty: currentMode === "word" ? difficulty : null,
        video_title: currentMode === "topic" ? selectedTitle : null,
      }),
    };

    fetch("http://13.125.48.140/chatbot", requestData)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Network response was not ok: ${text}`);
          });
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
            { text: inputText, sender: "user" },
            ...botReplies.map((reply, index) => ({
              text: typeof reply === 'string' ? reply : JSON.stringify(reply),
              sender: "reply",
              key: index,
            })),
          ]);
          setInputText("");
          setError("");
        }
      })
      .catch(() => {
        setError("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [inputText, currentMode, difficulty, selectedTitle, csrftoken]);

  const handleButtonClick = useCallback((mode, difficulty = "") => {
    if (currentMode === mode) {
      // 현재 모드와 같은 모드를 클릭한 경우에는 아무 것도 하지 않음
      return;
    }

    // 모드 변경 처리
    setCurrentMode(mode);
    setDifficulty(mode === "word" ? difficulty : "");
    setSelectedTitle("");

    if (mode === "topic") {
      setShowPopup(true);
    } else if (mode === "word") {
      sendMessage(); // Word 모드로 변경 시 자동으로 메시지 전송
    }
  }, [currentMode, sendMessage]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === "Enter") {
      sendMessage();
      event.preventDefault();
    }
  }, [sendMessage]);

  const handleVideoTitleSelection = useCallback((title) => {
    setSelectedTitle(title);
    setShowPopup(false);
    sendMessage(); // 제목을 선택하면 메시지를 전송합니다.
  }, [sendMessage]);

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
        {["advanced", "intermediate", "easy"].map((level) => (
          <button
            key={level}
            className="chatbot-button wordbutton"
            onClick={() => handleButtonClick("word", level)}
          >
            Word ({level})
          </button>
        ))}
        <button
          className="chatbot-button speakingbutton"
          onClick={() => handleButtonClick("topic")}
        >
          영상주제
        </button>
      </div>

      {showPopup && (
        <div className="video-title-popup">
          <h3>영상 제목을 선택하세요:</h3>
          <ul>
            {videoTitles.map((title, index) => (
              <li
                key={index}
                onClick={() => handleVideoTitleSelection(title)}
                className={selectedTitle === title ? "selected" : ""}
              >
                {title}
              </li>
            ))}
          </ul>
          <button onClick={() => setShowPopup(false)}>확인</button>
        </div>
      )}

      <div className="chatbot-input-container">
        <input
          type="text"
          placeholder="무엇이든 물어보세요!"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="chatbot-input"
        />
        <button className="chatbot-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
