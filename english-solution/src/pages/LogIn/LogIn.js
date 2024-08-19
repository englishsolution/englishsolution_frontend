import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

const LogIn = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onLogin();
        navigate('/');
      } else {
        setError(data.message || '로그인 실패. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      setError('로그인 정보가 일치하지 않습니다.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        로그인
      </button>
      <div className="help-links">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // 기본 링크 동작 방지
            navigate('/find-id'); // 아이디 찾기 페이지로 이동
          }}
        >
          아이디 찾기
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // 기본 링크 동작 방지
            navigate('/find-password'); // 비밀번호 찾기 페이지로 이동
          }}
        >
          비밀번호 찾기
        </a>
        <button className="signup-button" onClick={() => navigate('/sign-up')}>
          회원가입
        </button>
      </div>
      <div className="divider"></div>
      <button className="naver-button">네이버 로그인</button>
      <button className="kakao-button">카카오 로그인</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LogIn;
