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
  const [companyData, setCompanyData] = useState(null);
  const [ratings, setRatings] = useState([]);

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
          // @ts-expect-error TS(2345): Argument of type 'void' is not assignable to param... Remove this comment to see the full error message
          .then(console.log("RATINGSSSSS" + ratings))
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
    // @ts-expect-error TS(2339): Property 'ratingValue' does not exist on type 'nev... Remove this comment to see the full error message
    ? (ratings.reduce((sum, rating) => sum + rating.ratingValue, 0) / ratings.length).toFixed(1)
    : null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // @ts-expect-error TS(2345): Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    const parsedRatingValue = parseFloat(ratingValue).toFixed(1);
    // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'string' a... Remove this comment to see the full error message
    if (parsedRatingValue < 1 || parsedRatingValue > 5) {
      setMessage('El valor del rating debe estar entre 1 y 5.');
      return;
    }

    try {
      const response = await axios.post('/ratings', {
        ratingValue: parsedRatingValue,
        comment,
        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
        companyId: companyData?.id
      });
      setMessage('Comentario agregado exitosamente');
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      setRatingValue('');
      setComment('');

      // Actualizar el estado de los comentarios
      // @ts-expect-error TS(2345): Argument of type '(prevRatings: never[]) => any[]'... Remove this comment to see the full error message
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
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 2 }}>
              // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
              {companyData.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Perfil de la Compañía
            </Typography>
          </Box>

          {/* Información de la compañía */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
                  Información Básica
                </Typography>
                // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                <Typography><strong>Nombre:</strong> {companyData.name}</Typography>
                // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
                <Typography><strong>Descripción:</strong> {companyData.description || 'No disponible'}</Typography>
                // @ts-expect-error TS(2339): Property 'email' does not exist on type 'never'.
                <Typography><strong>Correo Electrónico:</strong> {companyData.email}</Typography>
                // @ts-expect-error TS(2339): Property 'phone' does not exist on type 'never'.
                <Typography><strong>Teléfono:</strong> {companyData.phone}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
                  Dirección
                </Typography>
                // @ts-expect-error TS(2339): Property 'address' does not exist on type 'never'.
                {companyData.address ? (
                  <>
                    // @ts-expect-error TS(2339): Property 'address' does not exist on type 'never'.
                    <Typography><strong>Dirección:</strong> {companyData.address}</Typography>
                    // @ts-expect-error TS(2339): Property 'city' does not exist on type 'never'.
                    <Typography><strong>Ciudad:</strong> {companyData.city}</Typography>
                    // @ts-expect-error TS(2339): Property 'state' does not exist on type 'never'.
                    <Typography><strong>Estado:</strong> {companyData.state}</Typography>
                    // @ts-expect-error TS(2339): Property 'country' does not exist on type 'never'.
                    <Typography><strong>País:</strong> {companyData.country}</Typography>
                    // @ts-expect-error TS(2339): Property 'zipCode' does not exist on type 'never'.
                    <Typography><strong>Código Postal:</strong> {companyData.zipCode}</Typography>
                  </>
                ) : (
                  <Typography color="text.secondary">Dirección no disponible</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>

          {/* Formulario para agregar comentario */}
          <Paper elevation={3} sx={{ padding: 3, marginTop: 4, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
              Agregar Comentario
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ marginBottom: 2 }}>
              Será anónimo :)
            </Typography>
            {message && (
              <Typography color="success.main" sx={{ marginBottom: 2 }}>
                {message}
              </Typography>
            )}
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Valoración
              </Typography>
              <Rating
                name="rating"
                value={ratingValue}
                // @ts-expect-error TS(6133): 'event' is declared but its value is never read.
                onChange={(event, newValue) => setRatingValue(newValue)}
                precision={1}
                size="large"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Comentario"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                multiline
                rows={3}
                fullWidth
                required
                sx={{ marginBottom: 2 }}
              />
              <Box display="flex" justifyContent="space-between">
                <Button variant="outlined" color="secondary" onClick={() => window.history.back()}>
                  Atrás
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Agregar Comentario
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Calificaciones */}
          <Paper elevation={3} sx={{ padding: 3, marginTop: 4, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}>
              Calificaciones
            </Typography>
            {ratings.length > 0 ? (
              <>
                <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Promedio:</Typography>
                  // @ts-expect-error TS(2769): No overload matches this call.
                  <Rating value={averageRating} readOnly precision={0.5} sx={{ marginLeft: 2 }} />
                  <Typography variant="h6" sx={{ marginLeft: 1 }}>{averageRating}</Typography>
                </Box>
                {ratings.map(rating => (
                  <Box
                    // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                    key={rating.id}
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                      padding: 2,
                      marginBottom: 2,
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
                    }}
                  >
                    // @ts-expect-error TS(2339): Property 'ratingValue' does not exist on type 'nev... Remove this comment to see the full error message
                    <Rating value={rating.ratingValue} readOnly precision={0.5} />
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      // @ts-expect-error TS(2339): Property 'comment' does not exist on type 'never'.
                      {rating.comment || 'Sin comentario'}
                    </Typography>
                  </Box>
                ))}
              </>
            ) : (
              <Typography color="text.secondary">Esta compañía aún no tiene calificaciones.</Typography>
            )}
          </Paper>
        </>
      ) : (
        <Typography textAlign="center" color="text.secondary" sx={{ marginTop: 4 }}>
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
