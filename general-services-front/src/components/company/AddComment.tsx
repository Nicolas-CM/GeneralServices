import React, { useState, useEffect } from 'react';
import axios from '../../configs/AxiosConfig';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Button,
  Rating,
  TextField,
} from '@mui/material';
import { Business } from '@mui/icons-material';

const AddComment = ({
  onCommentAdded
}: any) => {
  const { contractorId } = useParams();
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  interface CompanyData {
    id: string;
    name: string;
    description?: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  }

  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  interface RatingData {
    id: string;
    ratingValue: number;
    comment: string;
  }

  const [ratings, setRatings] = useState<RatingData[]>([]);

  useEffect(() => {
    if (!contractorId) return;

    const fetchCompany = async () => {
      try {
        const response = await axios.get(`/contractors/company-by-contractor/${contractorId}`);
        setCompanyData(response.data);
        if (!response.data) return;
        axios
          .get(`ratings/company/${response.data.id}`)
          .then(ratingResponse => setRatings(ratingResponse.data))
          .catch(err => {
            setMessage('Error al cargar las calificaciones.');
            console.error(err);
          });

      } catch (error) {
        console.error('Error al obtener la compañía:', error);
        setMessage('Error al obtener la compañía');
      }
    };

    fetchCompany();
  }, [contractorId]);

  // Cálculo del promedio de calificaciones
  const averageRating = ratings.length > 0
    ? (ratings.reduce((sum, rating) => sum + rating.ratingValue, 0) / ratings.length).toFixed(1)
    : null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const parsedRatingValue = parseFloat(ratingValue.toString()).toFixed(1);
    if (Number(parsedRatingValue) < 1 || Number(parsedRatingValue) > 5) {
      setMessage('El valor del rating debe estar entre 1 y 5.');
      return;
    }

    try {
      const response = await axios.post('/ratings', {
        ratingValue: parsedRatingValue,
        comment,

        companyId: companyData?.id
      });
      setMessage('Comentario agregado exitosamente');

      setRatingValue(0);
      setComment('');

      // Actualizar el estado de los comentarios

      setRatings(prevRatings => [...prevRatings, response.data]);

      if (onCommentAdded) {
        onCommentAdded(response.data);
      }
    } catch (error) {
      setMessage('Error al agregar el comentario');
      console.error('Error al agregar el comentario:', error);
    }
  };

  return (
    <Container>
      {companyData ? (
        <>
          {/* Encabezado */}
          <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80, margin: '0 auto' }}>
              <Business sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant='h4' sx={{ fontWeight: 'bold', marginTop: 2 }}>
              {companyData.name}
            </Typography>
            <Typography variant='subtitle1' color='text.secondary'>
              Perfil de la Compañía
            </Typography>
          </Box>

          {/* Información de la compañía */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                <Typography variant='h5' sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
                  Información Básica
                </Typography>
                <Typography><strong>Nombre:</strong> {companyData.name}</Typography>
                <Typography><strong>Descripción:</strong> {companyData.description || 'No disponible'}</Typography>
                <Typography><strong>Correo Electrónico:</strong> {companyData.email}</Typography>
                <Typography><strong>Teléfono:</strong> {companyData.phone}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                <Typography variant='h5' sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
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
                  <Typography color='text.secondary'>Dirección no disponible</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>

          {/* Formulario para agregar comentario */}
          <Paper elevation={3} sx={{ padding: 3, marginTop: 4, borderRadius: 2 }}>
            <Typography variant='h5' sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
              Agregar Comentario
            </Typography>
            <Typography variant='subtitle1' color='text.secondary' sx={{ marginBottom: 2 }}>
              Será anónimo :)
            </Typography>
            {message && (
              <Typography color='success.main' sx={{ marginBottom: 2 }}>
                {message}
              </Typography>
            )}
            <Box component='form' onSubmit={handleSubmit}>
              <Typography variant='h6' sx={{ marginBottom: 1 }}>
                Valoración
              </Typography>
              <Rating
                name='rating'
                value={ratingValue}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setRatingValue(newValue);
                  }
                }}
                precision={1}
                size='large'
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label='Comentario'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                multiline
                rows={3}
                fullWidth
                required
                sx={{ marginBottom: 2 }}
              />
              <Box display='flex' justifyContent='space-between'>
                <Button variant='outlined' color='secondary' onClick={() => window.history.back()}>
                  Atrás
                </Button>
                <Button variant='contained' color='primary' type='submit'>
                  Agregar Comentario
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Calificaciones */}
          <Paper elevation={3} sx={{ padding: 3, marginTop: 4, borderRadius: 2 }}>
            <Typography variant='h5' sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
              Calificaciones
            </Typography>
            {ratings.length > 0 ? (
              <>
                <Box display='flex' alignItems='center' sx={{ marginBottom: 2 }}>
                  <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Promedio:</Typography>
                  <Rating value={averageRating ? parseFloat(averageRating) : null} readOnly precision={0.5} sx={{ marginLeft: 2 }} />
                  <Typography variant='h6' sx={{ marginLeft: 1 }}>{averageRating}</Typography>
                </Box>
                {ratings.map(rating => (
                  <Box

                    key={rating.id}
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                      padding: 2,
                      marginBottom: 2,
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
                    }}
                  >
                    <Rating value={rating.ratingValue} readOnly precision={0.5} />
                    <Typography variant='body2' sx={{ marginTop: 1 }}>
                      {rating.comment || 'Sin comentario'}
                    </Typography>
                  </Box>
                ))}
              </>
            ) : (
              <Typography color='text.secondary'>Esta compañía aún no tiene calificaciones.</Typography>
            )}
          </Paper>
        </>
      ) : (
        <Typography textAlign='center' color='text.secondary' sx={{ marginTop: 4 }}>
          Cargando datos de la compañía...
        </Typography>
      )}
    </Container>
  );
};
AddComment.propTypes = {
  onCommentAdded: PropTypes.func,
};

export default AddComment;
