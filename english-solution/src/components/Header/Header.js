// Header.js

import React from 'react';
import './Header.css'; // Header 스타일을 위한 CSS 파일 import

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="/path/to/logo.png" alt="Logo" />
                <span>영솔</span>
            </div>
            <nav className="navigation">
                <ul>
                    <li><a href="#">Log-In</a></li>
                    <li><a href="#">회원가입</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
