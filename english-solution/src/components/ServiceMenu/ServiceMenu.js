// ServiceMenu.js

import React from 'react';
import './ServiceMenu.css';

const ServiceMenu = () => {
  return (
    <div className="service-menu">
      <ul>
        <li><a href="#">서비스 소개</a></li>
        <li><a href="#">사용 가이드</a></li>
        <li><a href="#">학습하기</a></li>
        <li><a href="#">챗봇</a></li>
      </ul>
    </div>
  );
}

export default ServiceMenu;
