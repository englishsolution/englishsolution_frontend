// src/components/PrivateRoute/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../pages/AuthContext/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { auth } = useAuth();

  return auth ? <Component {...rest} /> : <Navigate to="/log-in" />;
};

export default PrivateRoute;
