import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindPassword.css'; // 스타일 파일 추가

const FindPassword = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFindPassword = async () => {
    try {
      const response = await fetch('/api/find-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, id }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('이메일로 비밀번호가 전송되었습니다.');
      } else {
        setError(data.message || '비밀번호 찾기 실패. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('비밀번호 찾기 중 오류 발생:', error);
      setError('서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    }
  };

  return (
    <div className="find-password-container">
      <h2>비밀번호 찾기</h2>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="find-password-input"
      />
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="find-password-input"
      />
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="find-password-input"
      />
      <button onClick={handleFindPassword} className="find-password-button">
        비밀번호 찾기
      </button>
      {message && (
        <div>
          <p>{message}</p>
          <button onClick={() => navigate('/log-in')} className="login-button">
            로그인 하러 가기
          </button>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FindPassword;
