import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext'; // useAuth import
import './LogIn.css';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // useAuth를 통해 login 함수 가져오기

  useEffect(() => {
    // Kakao SDK 로드 및 초기화
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init('YOUR_JAVASCRIPT_KEY'); // Kakao JavaScript SDK 키를 입력하세요
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
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        login(); // 로그인 상태 설정
        navigate('/'); // 메인 페이지로 리다이렉션
      } else {
        setError(data.message || '로그인 실패. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      setError('로그인 정보가 일치하지 않습니다.');
    }
  };

  const handleKakaoLogin = () => {
    if (window.Kakao) {
      window.Kakao.Auth.login({
        success: function (authObj) {
          console.log(authObj);
          // 로그인 성공 후 처리
          // 예: 서버에 authObj.access_token을 보내서 사용자 인증
          login(); // 로그인 상태 설정
          navigate('/'); // 메인 페이지로 리다이렉션
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
