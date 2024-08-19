import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindId.css'; // 스타일 파일 추가

const FindId = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFindId = async () => {
    try {
      const response = await fetch('/api/find-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('이메일로 아이디가 전송되었습니다.');
      } else {
        setError(data.message || '아이디 찾기 실패. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('아이디 찾기 중 오류 발생:', error);
      setError('서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    }
  };

  return (
    <div className="find-id-container">
      <h2>아이디 찾기</h2>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="find-id-input"
      />
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="find-id-input"
      />
      <button onClick={handleFindId} className="find-id-button">
        아이디 찾기
      </button>
      {message && (
        <div>
          <p>{message}</p>
          <button onClick={() => navigate('/LogIn')} className="login-button">
            로그인 하러 가기
          </button>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FindId;
