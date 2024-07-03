import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
            <Link to="/" className="logo-link">
                <img src="/path/to/logo.png" alt="Logo" />
                <span>영솔</span>
            </Link>
            </div>
            <nav className="navigation">
                <ul>
                    <li><Link to="/log-in">로그인</Link></li> 
                    <li><Link to="/sign-up">회원가입</Link></li> 
                </ul>
            </nav>
        </header>
    );
}

export default Header;
