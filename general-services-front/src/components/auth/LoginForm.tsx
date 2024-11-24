import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../configs/AxiosConfig'; //
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useOutletContext } from 'react-router-dom';


function LoginForm({
  setMessage,
  message
}: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // @ts-expect-error TS(2339): Property 'handleLoginHeader' does not exist on typ... Remove this comment to see the full error message
  const { handleLoginHeader } = useOutletContext();

  // Eliminar cualquier token anterior
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('roles');

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      console.log(username, password)
      const response = await axios.post('auth/login', { username, password });
      const { token } = response.data;
      console.log('pasó de la 14');
      console.log('Token recibido:', token);
      // Eliminar cualquier token anterior
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('roles');
      // Limpiar cualquier token anterior
      sessionStorage.clear();

      const decodedToken = jwtDecode(token);


      // Almacenar el nuevo token
      sessionStorage.setItem('token', token);
      // @ts-expect-error TS(2339): Property 'roles' does not exist on type 'JwtPayloa... Remove this comment to see the full error message
      sessionStorage.setItem('roles', decodedToken.roles);

      //const userRoles = JSON.parse(sessionStorage.getItem('roles')); // Asume que los roles del usuario están almacenados en sessionStorage como una lista
      const showroles = sessionStorage.getItem('roles');
      console.log("Roles del usuario:", showroles);

      // Redirigir al usuario a la página de inicio
      handleLoginHeader();
      navigate('/home'); //Nos vamos pa users

    } catch (error) {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        setMessage(error.response.data.message);
      } else {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        setMessage(error.message || 'Error al iniciar sesion');
      }
      console.error('Error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 3,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, maxWidth: 400, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 3 }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Usuario"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5 }}
          >
            Iniciar Sesión
          </Button>

          {/* Mover el mensaje de error aquí */}
          {message && (
            <Typography
              variant="h6"
              color="error"
              sx={{ fontWeight: 'bold', marginTop: 2, textAlign: 'center' }}
            >
              <strong>¡Advertencia!</strong> {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
LoginForm.propTypes = {
  setMessage: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default LoginForm;
