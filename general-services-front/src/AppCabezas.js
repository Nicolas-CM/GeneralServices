import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './components/LoginForm';  // Importamos el componente LoginForm
import UserList from './components/UserList';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');  // Estado para el mensaje

  // Verifica si el usuario tiene permisos
  const hasPermission = (permission) => permissions.includes(permission);

  // Verifica si el usuario está autenticado
  useEffect(() => {
    const token = sessionStorage.getItem('token');

    const roles=sessionStorage.getItem('roles');
    
    console.log("Roles del usuario:", JSON.stringify(roles, null, 2));
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
      console.log("Permisos del usuario:", JSON.stringify(decodedToken.permissions, null, 2));
      setPermissions(decodedToken.permissions || []);
      console.log("Permisos del usuario:", JSON.stringify(decodedToken.permissions, null, 2));

      setIsAuthenticated(true);
    }
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  // Si el usuario está autenticado, redirigir a la página de administración
  if (isAuthenticated) {
    return (
      <div>
          <UserList />
        </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Iniciar Sesión</h2>
        {/* Usamos el componente LoginForm y pasamos setMessage como prop */}
        <LoginForm 
          setIsAuthenticated={setIsAuthenticated} 
          setPermissions={setPermissions} 
          setMessage={setMessage} // Aquí pasas la función setMessage
        />
        {message && <p>{message}</p>} {/* Muestra el mensaje de error si existe */}
      </header>
    </div>
  );
}

export default App;
