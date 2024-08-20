import React, { useState, useEffect } from "react";
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

  // 네이버와 카카오 클라이언트 설정
  const NAVER_CLIENT_ID = "YOUR_NAVER_CLIENT_ID"; // 네이버 클라이언트 ID
  const NAVER_REDIRECT_URI = encodeURIComponent("https://yourdomain.com/naver/callback");
  const KAKAO_CLIENT_ID = "YOUR_KAKAO_CLIENT_ID"; // 카카오 JavaScript 키
  const KAKAO_REDIRECT_URI = "https://yourdomain.com/kakao/callback"; // 카카오 리디렉션 URI
  const STATE = "YOUR_STATE"; // CSRF 방지용 임의 문자열

  useEffect(() => {
    // 카카오 SDK 로드
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init(KAKAO_CLIENT_ID);
      }
    };
    document.body.appendChild(script);
  }, []);

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

  const handleNaverSignUp = () => {
    const naverSignUpUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${STATE}`;
    window.location.href = naverSignUpUrl;
  };

  const handleKakaoSignUp = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        console.log(authObj);
        // 로그인 성공 후 처리
        // 예: 서버에 사용자 정보를 보내고 회원가입 처리
      },
      fail: function (err) {
        console.error(err);
        alert('카카오 회원가입 실패');
      },
    });
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
        <button className="naver-login" onClick={handleNaverSignUp}>네이버 회원가입</button>
        <button className="kakao-login" onClick={handleKakaoSignUp}>카카오 회원가입</button>
      </div>
    </div>
  );
};

export default SignUp;
