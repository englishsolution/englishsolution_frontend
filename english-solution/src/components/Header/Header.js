
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";


const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">

          {/* <img src="/path/to/logo.png" alt="Logo" /> */}

          <span>영솔</span>
        </Link>
      </div>
      <nav className="navigation">
        <ul>
          {isLoggedIn ? (

            <>
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onLogout(); // 로그아웃 함수 호출
                  }}
                  aria-label="로그아웃"
                >
                  로그아웃
                </a>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/log-in" aria-label="로그인">로그인</Link></li>
              <li><Link to="/sign-up" aria-label="회원가입">회원가입</Link></li>
            </>

          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
