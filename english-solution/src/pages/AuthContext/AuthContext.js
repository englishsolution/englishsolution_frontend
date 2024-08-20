// src/pages/AuthContext/AuthContext.js
import React, { createContext, useState, useContext } from "react";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = (user) => setAuth(user);
  const logout = () => setAuth(null);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 훅
export const useAuth = () => useContext(AuthContext);
