import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpComplete.css";

const SignUpComplete = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/log-in"); // 로그인 페이지로 리디렉션
  };

  return (
    <div className="signup-complete">
      <h2>회원가입이 완료되었습니다</h2>
      <p>회원가입이 성공적으로 이루어졌습니다.</p>
      <button onClick={handleLoginRedirect}>로그인 하러가기</button>
    </div>
  );
};

export default SignUpComplete;
