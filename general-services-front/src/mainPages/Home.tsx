// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const userRoles = sessionStorage.getItem('roles'); // Asume que el rol del usuario está almacenado en sessionStorage
  console.log('Rol del usuario:', userRoles);

  useEffect(() => {

    if (userRoles && userRoles.includes('READ-USER')) {
      navigate('/admin/users');

    } else if (userRoles && userRoles.includes('ALL-CLIENT')) {
      navigate('/client/home');

    } else if (userRoles && userRoles.includes('ALL-COMPANY')) {
      navigate('/company/home');
    } else {
      navigate('/login'); // Redirige a la página principal si no hay rol
    }
  }, []);

  return <div>Cargando...</div>;
};

export default Home;