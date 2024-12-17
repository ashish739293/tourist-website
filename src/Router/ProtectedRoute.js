// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AdminAuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();

  return isAdmin ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
