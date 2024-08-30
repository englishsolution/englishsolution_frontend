// src/pages/LogOut/LogOut.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import './LogOut.css'; // 필요한 경우 스타일 추가

const LogOut = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // 백엔드 로그아웃 URL 호출
        const response = await fetch('http://127.0.0.1:8000/logout/', {
          method: 'POST', // POST 방식으로 로그아웃 요청
          credentials: 'include', // 쿠키를 포함하여 요청
        });

        if (response.ok) {
          // 로그아웃 성공 시 로컬 상태 업데이트
          logout();

          // 홈 페이지로 리디렉션
          navigate('/');
        } else {
          // 에러 처리
          console.error('로그아웃 요청 실패');
        }
      } catch (error) {
        console.error('로그아웃 중 오류 발생:', error);
      }
    };

    performLogout();

    // 일정 시간 후 홈 페이지로 리디렉션 (비동기 처리가 완료되기 전)
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000); // 2초 후 리디렉션

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="logout-container">
      <h2>로그아웃 중...</h2>
      <p>잠시만 기다려 주세요. 자동으로 홈 페이지로 이동합니다.</p>
    </div>
  );
};

export default LogOut;
