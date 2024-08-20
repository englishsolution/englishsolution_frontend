import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

const LogIn = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 카카오 SDK 로드
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init('YOUR_JAVASCRIPT_KEY'); // 카카오 JavaScript SDK 키
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://15.165.135.23/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // 서버에서 기대하는 필드
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

  const handleNaverLogin = () => {
    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&state=YOUR_STATE`;
    window.location.href = naverLoginUrl;
  };

  const handleKakaoLogin = () => {
    if (window.Kakao) {
      window.Kakao.Auth.login({
        success: function (authObj) {
          console.log(authObj);
          // 로그인 성공 후 처리
          // 예: 서버에 authObj.access_token을 보내서 사용자 인증
        },
        fail: function (err) {
          console.error(err);
          setError('카카오 로그인 실패');
        },
      });
    } else {
      console.error('Kakao SDK not loaded');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
            e.preventDefault();
            navigate('/find-id');
          }}
        >
          아이디 찾기
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/find-password');
          }}
        >
          비밀번호 찾기
        </a>
        <button className="signup-button" onClick={() => navigate('/sign-up')}>
          회원가입
        </button>
      </div>
      <div className="divider"></div>
      <button
        className="naver-button"
        onClick={handleNaverLogin}
      >
        네이버 로그인
      </button>
      <button
        className="kakao-button"
        onClick={handleKakaoLogin}
      >
        카카오 로그인
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LogIn;
