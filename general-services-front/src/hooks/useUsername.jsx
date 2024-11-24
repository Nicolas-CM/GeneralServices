import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Asegúrate de tener instalada esta librería

const useUsername = () => {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        console.log("decoded: ", decoded);
        console.log("username: ", decoded.sub);
        setUsername(decoded.sub); // Extraemos el username en lugar del userId
      }
    } catch (err) {
      setError('Error al decodificar el token');
    }
  }, []);

  return { username, error };
};

export default useUsername;