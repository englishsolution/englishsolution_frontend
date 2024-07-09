import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Chatbot.css"; // Chatbot 스타일링 파일

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [csrftoken, setCsrfToken] = useState("");

  useEffect(() => {
    // 페이지 로딩 시 초기화 시키기 위함
    setCsrfToken(Cookies.get("csrftoken"));
  }, []);

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    // Prepare request data
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ message: inputText }),
    };

    // Send message to backend
    fetch("http://15.165.135.23/chatbot/", requestData)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const botReply = data.reply;
        // Update messages state
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: inputText, sender: "user" },
          { text: botReply, sender: "bot" },
        ]);
        // Clear input text
        setInputText("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
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
            {msg.text}
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="chatbot-button wordbutton" onClick={sendMessage}>
          Word
        </button>
        <button className="chatbot-button speakingbutton" onClick={sendMessage}>
          Speaking
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
        <button className="chatbot-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
