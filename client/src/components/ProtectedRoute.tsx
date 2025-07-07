import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;