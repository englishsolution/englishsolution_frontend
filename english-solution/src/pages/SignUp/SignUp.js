import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 추가
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate(); // 추가
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
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

    if (formData.password1 !== formData.password2) {
      newErrors.password2 = "비밀번호가 일치하지 않습니다.";
      isValid = false;
    }

    if (formData.username.trim() === "") {
      newErrors.username = "사용자 이름을 입력하세요.";
      isValid = false;
    }

    if (formData.firstName.trim() === "") {
      newErrors.firstName = "이름을 입력하세요.";
      isValid = false;
    }

    if (formData.lastName.trim() === "") {
      newErrors.lastName = "성씨를 입력하세요.";
      isValid = false;
    }

    if (formData.email.trim() === "") {
      newErrors.email = "이메일을 입력하세요.";
      isValid = false;
    }

    if (formData.password1.trim() === "") {
      newErrors.password1 = "비밀번호를 입력하세요.";
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

    try {
      const response = await fetch('http://15.165.135.23/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password1: formData.password1,
          password2: formData.password2,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("회원가입 성공:", data);
        navigate('/sign-up-complete'); // 회원가입 성공 후 리디렉션
      } else {
        const errorData = await response.json();
        console.error("회원가입 실패:", errorData);
        // 서버에서 반환한 에러 메시지 처리
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
    }
  };

  const handleSocialLoginClick = (e) => {
    e.preventDefault();
    alert("소셜 회원가입 기능은 현재 사용할 수 없습니다."); // 테스트용 알림, 추후 제거 가능
  };

  return (
    <div className="signup-page">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">이름:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">성씨:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
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
          <label htmlFor="username">아이디:</label>
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
          <label htmlFor="password1">비밀번호:</label>
          <input
            type="password"
            id="password1"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            required
          />
          {errors.password1 && <p className="error-message">{errors.password1}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password2">비밀번호 확인:</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
          />
          {errors.password2 && <p className="error-message">{errors.password2}</p>}
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
