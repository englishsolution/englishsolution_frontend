import React, { useState } from 'react';
import './FakeChatbot.css'; // Chatbot 스타일링 파일

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    // 사용자가 보낸 메시지를 추가
    setMessages(prevMessages => [
      ...prevMessages,
      { text: message, sender: 'user' }
    ]);

    // 챗봇의 답변 추가 (임시로 예시 답변 추가)
    if (message === 'Hello! Can you recommend a lunch menu for today?') {
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Sure! What kind of food do you want?', sender: 'bot' }
        ]);
      }, 500); // 챗봇의 답변이 0.5초 뒤에 추가되도록 설정 (임시)
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage(event.target.value);
      event.target.value = ''; // 입력창 초기화
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-bubble">
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button className="chatbot-button wordbutton" onClick={() => handleSendMessage('Hello! Can you recommend a lunch menu for today?')}>Word</button>
        <button className="chatbot-button speakingbutton" onClick={() => handleSendMessage('I prefer something healthy and light.')}>Speaking</button>
      </div>

      <div className="chatbot-input-container">
        <input
          type="text"
          placeholder="무엇이든 물어보세요!"
          onKeyPress={handleKeyPress}
          className="chatbot-input"
        />
        <button className="chatbot-button" onClick={() => handleSendMessage(document.querySelector('.chatbot-input').value)}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
