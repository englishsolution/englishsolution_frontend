import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LogIn.css";

const LogIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직 추가
    console.log("로그인 데이터:", formData);
    // 여기에 실제 로그인 처리 코드를 추가할 수 있습니다.
  };

  return (
    <div className="login-page">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">사용자 이름:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      <p>계정이 없으신가요? <Link to="/sign-up">회원가입</Link></p>
    </div>
  );
};

export default LogIn;
