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
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        setUsername(decoded.sub); // Extraemos el username en lugar del userId
      }
    } catch (err) {
      // @ts-expect-error TS(2345): Argument of type '"Error al decodificar el token"'... Remove this comment to see the full error message
      setError('Error al decodificar el token');
    }
  }, []);

  return { username, error };
};

export default useUsername;