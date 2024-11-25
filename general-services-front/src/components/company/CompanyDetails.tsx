import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../configs/AxiosConfig';
import {
    Container,
    Box,
    Typography,
    Paper,
    Grid,
    CircularProgress,
    Rating,
    List,
    ListItem,
    Button,
    Avatar,
} from '@mui/material';
import { Business } from '@mui/icons-material';

interface Company {
    id: string;
    name: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

interface Rating {
    id: string;
    ratingValue: number;
    comment: string;
}

const CompanyDetails = () => {
    const { companyId, serviceId } = useParams();
    const [company, setCompany] = useState<Company | null>(null);
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Cargar los detalles de la compañía
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axios.get(`/companies/${companyId}`);
                setCompany(response.data);

                if (!response.data) return;
                const ratingResponse = await axios.get(`ratings/company/${response.data.id}`);
                setRatings(ratingResponse.data);
            } catch (error) {
                setMessage('Error al cargar los detalles de la compañía.');
                console.error(error);
            }
        };

        fetchCompany();
    }, [companyId]);

    // Cálculo del promedio de calificaciones
    const averageRating = ratings.length > 0
        ? parseFloat(
            (ratings.reduce((sum, rating) => sum + rating.ratingValue, 0) / ratings.length).toFixed(1)
        )
        : null;

    // Redirige al formulario de solicitud
    const handleRequestClick = () => {
        navigate(`/client/request-form/${companyId}/${serviceId}`, {
            state: { serviceName: 'Nombre del Servicio', companyName: company?.name || '' },
        });
    };

    if (!company && !message) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
            >
                <CircularProgress />
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Cargando detalles de la compañía...
                </Typography>
            </Box>
        );
    }

    return (
        <Container>
            {message && (
                <Typography sx={{ color: 'error.main', textAlign: 'center' }}>{message}</Typography>
            )}
            {company && (
                <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                    <Avatar
                        sx={{ bgcolor: 'primary.main', width: 80, height: 80, margin: '0 auto' }}
                    >
                        <Business sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                        {company.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Perfil de la Compañía
                    </Typography>
                </Box>
            )}

            <Box display="flex" justifyContent="center" sx={{ marginTop: 4, marginBottom: 4 }}>
                <Button variant="contained" onClick={handleRequestClick}>
                    Hacer Solicitud
                </Button>
            </Box>

            {company && (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                            <Typography
                                variant="h5"
                                sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}
                            >
                                Información Básica
                            </Typography>
                            <Typography>
                                <strong>Descripción:</strong> {company.description || 'No disponible'}
                            </Typography>
                            <Typography>
                                <strong>Teléfono:</strong> {company.phone || 'No disponible'}
                            </Typography>
                            <Typography>
                                <strong>Email:</strong> {company.email || 'No disponible'}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                            <Typography
                                variant="h5"
                                sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}
                            >
                                Dirección
                            </Typography>
                            {company.address && (
                                <>
                                    <Typography>
                                        <strong>Dirección:</strong> {company.address}
                                    </Typography>
                                    <Typography>
                                        <strong>Ciudad:</strong> {company.city}
                                    </Typography>
                                    <Typography>
                                        <strong>Estado:</strong> {company.state}
                                    </Typography>
                                    <Typography>
                                        <strong>País:</strong> {company.country}
                                    </Typography>
                                    <Typography>
                                        <strong>Código Postal:</strong> {company.zipCode}
                                    </Typography>
                                </>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            )}

            <Grid container spacing={3} sx={{ marginTop: 4 }}>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}
                        >
                            Promedio de Calificaciones
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
                            <Rating value={averageRating || 0} readOnly precision={0.5} sx={{ marginRight: 2 }} />
                            <Typography variant="h6">
                                {averageRating || 'No disponible'}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Paper elevation={3} sx={{ padding: 3, marginTop: 4, borderRadius: 2 }}>
                <Typography
                    variant="h5"
                    sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 'bold' }}
                >
                    Comentarios
                </Typography>
                {ratings.length > 0 ? (
                    <List>
                        {ratings.map((rating) => (
                            <ListItem
                                key={rating.id}
                                sx={{
                                    marginBottom: 2,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 1,
                                    padding: 2,
                                }}
                            >
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
                ) : (
                    <Typography color="text.secondary">No hay comentarios disponibles.</Typography>
                )}
            </Paper>
        </Container>
    );
};

export default CompanyDetails;
