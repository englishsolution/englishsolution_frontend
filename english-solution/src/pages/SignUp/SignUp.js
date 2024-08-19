import React, { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userId: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userId: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "유효한 이메일 주소를 입력하세요.";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      isValid = false;
    }

    if (formData.username.trim() === "") {
      newErrors.username = "사용자 이름을 입력하세요.";
      isValid = false;
    }

    if (formData.userId.trim() === "") {
      newErrors.userId = "아이디를 입력하세요.";
      isValid = false;
    }

    if (formData.password.trim() === "") {
      newErrors.password = "비밀번호를 입력하세요.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const isUserIdTaken = await checkUserIdAvailability(formData.userId);
    if (isUserIdTaken) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userId: "이미 사용 중인 아이디입니다."
      }));
      return;
    }

    console.log("회원가입 데이터:", formData);
  };

  const checkUserIdAvailability = async (userId) => {
    try {
      const response = await fetch('/api/check-userid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });
      const data = await response.json();
      return data.isTaken;
    } catch (error) {
      console.error("아이디 중복 확인 중 오류 발생:", error);
      return false;
    }
  };

  // 소셜 로그인 버튼 클릭 시 동작하지 않도록 처리
  const handleSocialLoginClick = (e) => {
    e.preventDefault();
    alert("소셜 회원가입 기능은 현재 사용할 수 없습니다."); // 테스트용 알림, 추후 제거 가능
  };

  return (
    <div className="signup-page">
      <h2>회원가입</h2>
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
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="userId">아이디:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
          {errors.userId && <p className="error-message">{errors.userId}</p>}
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
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
        <button type="submit">회원가입</button>
        <div className="divider"></div> {/* 구분선 추가 */}
      </form>
      <div className="social-login">
          <button className="naver-login" onClick={handleSocialLoginClick}>네이버 회원가입</button>
          <button className="kakao-login" onClick={handleSocialLoginClick}>카카오 회원가입</button>
      </div>
    </div>
  );
};

export default SignUp;
