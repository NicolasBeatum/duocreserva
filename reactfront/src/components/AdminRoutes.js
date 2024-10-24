import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/authContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, userType } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userType !== 1) {
    return <div>No tienes acceso a esta página</div>;
  }

  return children;
};

export default AdminRoute;