// src/components/PrivateRoute/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../pages/AuthContext/AuthContext'; // 올바른 경로 확인

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { auth } = useAuth(); // useAuth 훅 사용

  return (
    <Route
      {...rest}
      element={auth ? <Element /> : <Navigate to="/log-in" />}
    />
  );
};

export default PrivateRoute;
