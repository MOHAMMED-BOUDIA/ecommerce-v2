import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedAdminRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, role, token } = auth;

  // Check if admin is authenticated and has admin role
  const isAdmin = isAuthenticated && role === 'admin' && token;

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
