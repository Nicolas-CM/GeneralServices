// src/components/Authenticator.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Authenticator = ({
  children,
  allowedRoles
}: any) => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Autenticando...");
    const token = sessionStorage.getItem("token");
    const roles = sessionStorage.getItem("roles");
    let isAuth = false;

    if (token && roles) {
      const userRoles = roles.split(',');
      isAuth = allowedRoles.some((role: any) => userRoles.includes(role));
      console.log("Autenticado: ", isAuth);
    }

    setAuth(isAuth);

    if (!isAuth) {
      navigate("/login");
      sessionStorage.setItem("redirectUrl", window.location.href);
    }
  }, [navigate, allowedRoles]);

  console.log("Auth: ", auth);

  if (auth === null) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      {auth ? children : <p>No tienes permisos para ver esta página</p>}
    </>
  );
};
Authenticator.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Authenticator;
