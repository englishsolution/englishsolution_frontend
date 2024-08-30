// src/components/ServiceMenu/ServiceMenu.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../pages/AuthContext/AuthContext'; // 올바른 경로로 수정
import "./ServiceMenu.css";

const ServiceMenu = () => {
  const { auth } = useAuth(); // 현재 로그인 상태 가져오기

  return (
    <div className="service-menu">
      <ul>
        <li>
          <Link to="/service-intro">서비스 소개</Link>
        </li>
        <li>
          <Link to="/usage-guide">사용 가이드</Link>
        </li>
        {auth && (
          <>
            <li>
              <Link to="/learning">학습하기</Link>
            </li>
            <li>
              <Link to="/save-list">저장 기록</Link>
            </li>
            <li>
              <Link to="/chatbot">챗봇</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default ServiceMenu;
