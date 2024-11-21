// src/components/Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { resetState } from '../../store/slices/requestsSlice';

const Logout = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    // Elimina el token y cualquier  otra información relevante del almacenamiento local

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('redirectUrl');
    // Elimina todos los elementos del sessionStorage
    sessionStorage.clear();

    // Resetea el estado de Redux
    dispatch(resetState());

    // Redirige al usuario a la página de inicio de sesión
    navigate('/login');
  }, [navigate, dispatch]);

  return <h1>Cargando...</h1>;
};

export default Logout;