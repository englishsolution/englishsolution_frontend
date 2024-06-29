// Header.js

import React from 'react';
import './Header.css'; // Header 스타일을 위한 CSS 파일 import

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="/path/to/logo.png" alt="Logo" />
                <span>My Website</span>
            </div>
            <nav className="navigation">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
