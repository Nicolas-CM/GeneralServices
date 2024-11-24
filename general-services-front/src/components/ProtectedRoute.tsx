// src/components/ProtectedRoute.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = sessionStorage.getItem('role'); // Asume que el rol del usuario está almacenado en sessionStorage

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />; // Redirige a la página principal si el usuario no tiene el rol permitido
  }

  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
