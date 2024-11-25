import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de tener instalada esta librería

const useUsername = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        console.log('decoded: ', decoded);
        console.log('username: ', decoded.sub);

        if (typeof decoded.sub === 'string') {
          setUsername(decoded.sub); // Extraemos el username en lugar del userId
        } else {
          setError('El token no contiene un username válido');
        }
      }
    } catch (err) {

      setError('Error al decodificar el token');
    }
  }, []);

  return { username, error };
};

export default useUsername;