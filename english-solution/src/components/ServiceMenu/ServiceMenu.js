// ServiceMenu.js

import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceMenu.css';

const ServiceMenu = () => {
  return (
    <div className="service-menu">
      <ul>
        <li><Link to="/service-intro">서비스 소개</Link></li>
        <li><Link to="/usage-guide">사용 가이드</Link></li>
        <li><Link to="/learning">학습하기</Link></li>
        <li><Link to="/chatbot">챗봇</Link></li>
      </ul>
    </div>
  );
}

export default ServiceMenu;
