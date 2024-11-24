// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const userRoles = sessionStorage.getItem('roles'); // Asume que el rol del usuario está almacenado en sessionStorage
  console.log("Rol del usuario:", userRoles);

  useEffect(() => {
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    if (userRoles.includes('READ-USER')) {
      navigate('/admin/users');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    } else if (userRoles.includes('ALL-CLIENT')) {
      navigate('/client/home');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    } else if (userRoles.includes('ALL-COMPANY')) {
      navigate('/company/home');
    } else {
      navigate('/login'); // Redirige a la página principal si no hay rol
    }
  }, []);

  return <div>Cargando...</div>;
};

export default Home;