import React, { createContext, useState, useContext } from 'react';

// Context 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = () => {
    setAuth(true); // 로그인 상태로 설정
  };

  const logout = () => {
    setAuth(null); // 로그아웃 상태로 설정
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 훅
export const useAuth = () => useContext(AuthContext);
