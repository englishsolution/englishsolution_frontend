import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Chatbot.css"; // Chatbot 스타일링 파일

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [csrftoken, setCsrfToken] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("general");

  useEffect(() => {
    // 페이지 로딩 시 초기화 시키기 위함
    setCsrfToken(Cookies.get("csrftoken"));
  }, []);

  const sendMessage = (prompt) => {
    if (inputText.trim() === "") return;

    // Prepare request data
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ mode: prompt, prompt: inputText }),
    };

    // Send message to backend
    fetch("http://15.165.135.23/chatbot", requestData)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const botReplies = data.replies; // Assuming 'data.replies' is an array of replies
        // Update messages state with user input and bot replies
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: inputText, sender: "user" },
          ...botReplies.map((reply, index) => ({
            text: reply,
            sender: "bot",
            key: index,
          })),
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
      sendMessage(currentPrompt);
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
          onClick={() => setCurrentPrompt("high")}
        >
          Word (상)
        </button>
        <button
          className="chatbot-button wordbutton"
          onClick={() => setCurrentPrompt("medium")}
        >
          Word (중)
        </button>
        <button
          className="chatbot-button wordbutton"
          onClick={() => setCurrentPrompt("low")}
        >
          Word (하)
        </button>
        <button
          className="chatbot-button speakingbutton"
          onClick={() => sendMessage(currentPrompt)}
        >
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
        <button
          className="chatbot-button"
          onClick={() => sendMessage(currentPrompt)}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
