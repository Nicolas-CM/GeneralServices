// @ts-expect-error TS(2616): 'React' can only be imported by using 'import Reac... Remove this comment to see the full error message
import { React, useEffect, useState } from 'react';
import axios from '../../configs/AxiosConfig';
import useUsername from '../../hooks/useUsername';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { Person, LocationOn } from '@mui/icons-material';

const ClientProfile = () => {
  const { username, error: usernameError } = useUsername();
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Paso 1: Obtención del userId con el username
  useEffect(() => {
    if (!username) return; // No hacer nada si no tenemos el username

    axios.get(`users/username/${username}`)
      .then(response => {
        setUserId(response.data); // Guardamos el userId
      })
      .catch(err => {
        // @ts-expect-error TS(2345): Argument of type '"Error al obtener el ID del usua... Remove this comment to see the full error message
        setError('Error al obtener el ID del usuario');
        console.error(err);
      });
  }, [username]);

  // Paso 2: Usamos el userId para obtener los datos del usuario
  useEffect(() => {
    if (!userId) return; // No hacer nada si no tenemos el userId

    axios.get(`users/${userId}`)
      .then(response => {
        setUserData(response.data); // Guardamos los datos del usuario
      })
      .catch(err => {
        // @ts-expect-error TS(2345): Argument of type '"Error al cargar los datos del p... Remove this comment to see the full error message
        setError('Error al cargar los datos del perfil');
        console.error(err);
      });
  }, [userId]);

  if (usernameError) {
    return <Box sx={{ textAlign: 'center', color: 'error.main' }}>{usernameError}</Box>;
  }

  if (error) {
    return <Box sx={{ textAlign: 'center', color: 'error.main' }}>{error}</Box>;
  }

  if (!userData) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Cargando información del usuario...
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80, margin: '0 auto' }}>
          <Person sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 2 }}>
          // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
          {userData.name} {userData.lastName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Perfil del Usuario
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Información Básica */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
              Información Básica
            </Typography>
            // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
            <Typography><strong>Nombre:</strong> {userData.name} {userData.lastName}</Typography>
            // @ts-expect-error TS(2339): Property 'email' does not exist on type 'never'.
            <Typography><strong>Correo Electrónico:</strong> {userData.email}</Typography>
            // @ts-expect-error TS(2339): Property 'phone' does not exist on type 'never'.
            <Typography><strong>Teléfono:</strong> {userData.phone}</Typography>
          </Paper>
        </Grid>

        {/* Dirección */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
              Dirección
            </Typography>
            // @ts-expect-error TS(2339): Property 'address' does not exist on type 'never'.
            {userData.address ? (
              <>
                // @ts-expect-error TS(2339): Property 'address' does not exist on type 'never'.
                <Typography><strong>Dirección:</strong> {userData.address}</Typography>
                // @ts-expect-error TS(2339): Property 'city' does not exist on type 'never'.
                <Typography><strong>Ciudad:</strong> {userData.city}</Typography>
                // @ts-expect-error TS(2339): Property 'state' does not exist on type 'never'.
                <Typography><strong>Estado:</strong> {userData.state}</Typography>
                // @ts-expect-error TS(2339): Property 'country' does not exist on type 'never'.
                <Typography><strong>País:</strong> {userData.country}</Typography>
                // @ts-expect-error TS(2339): Property 'zipCode' does not exist on type 'never'.
                <Typography><strong>Código Postal:</strong> {userData.zipCode}</Typography>
              </>
            ) : (
              <Typography>
                <LocationOn sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                Dirección no disponible
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientProfile;
