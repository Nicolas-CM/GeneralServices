import { React, useEffect, useState } from 'react';
import axios from '../../configs/AxiosConfig';
import useUsername from '../../hooks/useUsername';
import {
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  CircularProgress,
  Box,
  Rating,
  Avatar,
} from '@mui/material';
import { Business, LocationOn } from '@mui/icons-material';

const CompanyProfile = () => {
  const { username, error: usernameError } = useUsername();
  const [companyData, setCompanyData] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    axios
      .get(`companies/owner/${username}`)
      .then(response => setCompanyData(response.data))
      .catch(err => {
        setError('Error al obtener los contratistas');
        console.error(err);
      });
  }, [username]);

  useEffect(() => {
    if (!companyData) return;
    axios
      .get(`ratings/company/${companyData.id}`)
      .then(ratingResponse => setRatings(ratingResponse.data))
      .catch(err => {
        setError('Error al cargar las calificaciones.');
        console.error(err);
      });
  }, [companyData]);

  const averageRating = ratings.length > 0
    ? (ratings.reduce((sum, rating) => sum + rating.ratingValue, 0) / ratings.length).toFixed(1)
    : null;

  if (usernameError) {
    return <Box sx={{ textAlign: 'center', color: 'error.main' }}>{usernameError}</Box>;
  }

  if (error) {
    return <Box sx={{ textAlign: 'center', color: 'error.main' }}>{error}</Box>;
  }

  if (!companyData) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Cargando información de la compañía...
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80, margin: '0 auto' }}>
          <Business sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 2 }}>
          {companyData.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Perfil de la Compañía
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
              Información Básica
            </Typography>
            <Typography sx={{ wordBreak: 'break-word' }}><strong>Nombre:</strong> {companyData.name}</Typography>
            <Typography sx={{ wordBreak: 'break-word' }}><strong>Descripción:</strong> {companyData.description || 'No disponible'}</Typography>
            <Typography><strong>Email:</strong> {companyData.email}</Typography>
            <Typography><strong>Teléfono:</strong> {companyData.phone}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
              Dirección
            </Typography>
            {companyData.address ? (
              <>
                <Typography><strong>Dirección:</strong> {companyData.address}</Typography>
                <Typography><strong>Ciudad:</strong> {companyData.city}</Typography>
                <Typography><strong>Estado:</strong> {companyData.state}</Typography>
                <Typography><strong>País:</strong> {companyData.country}</Typography>
                <Typography><strong>Código Postal:</strong> {companyData.zipCode}</Typography>
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

      <Paper elevation={3} sx={{ padding: 3, marginTop: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
          Calificaciones
        </Typography>
        {ratings.length > 0 ? (
          <>
            <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Promedio:</Typography>
              <Rating value={averageRating} readOnly precision={0.5} sx={{ marginLeft: 2 }} />
              <Typography variant="h6" sx={{ marginLeft: 1 }}>{averageRating}</Typography>
            </Box>
            <List>
              {ratings.map(rating => (
                <ListItem key={rating.id} sx={{
                  marginBottom: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  padding: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  },
                }}>
                  <Box display="flex" flexDirection="column" width="100%">
                    <Box display="flex" alignItems="center">
                      <Rating value={rating.ratingValue} readOnly precision={0.5} />
                      <Typography variant="body2" sx={{ marginLeft: 2 }}>
                        {rating.ratingValue} estrellas
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {rating.comment || 'Sin comentario'}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Typography color="text.secondary">Esta compañía aún no tiene calificaciones.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default CompanyProfile;
