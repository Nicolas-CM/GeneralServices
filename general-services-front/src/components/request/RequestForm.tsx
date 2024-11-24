import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../configs/AxiosConfig';
import useUsername from '../../hooks/useUsername';
import { Box, Container, Paper, Typography, TextField, Button, CircularProgress, Grid } from '@mui/material';

const RequestForm = () => {
    const { companyId, serviceId } = useParams();
    const { username } = useUsername();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        serviceId,
        companyId,
        username: '',
        status: 'Pendiente',
        date: new Date().toISOString().split('T')[0],
        description: ''
    });
    const [serviceName, setServiceName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (username) {
            setFormData((prevData) => ({
                ...prevData,
                username
            }));
        }
    }, [username]);

    useEffect(() => {
        const fetchServiceAndCompany = async () => {
            try {
                const serviceResponse = await axios.get(`/services/${serviceId}`);
                const companyResponse = await axios.get(`/companies/${companyId}`);
                setServiceName(serviceResponse.data.name);
                setCompanyName(companyResponse.data.name);
            } catch (error) {
                console.error('Error al obtener el nombre del servicio o de la compañía:', error);
            }
        };

        fetchServiceAndCompany();
    }, [serviceId, companyId]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post('/requests', formData);
            setMessage(`¡Solicitud creada con éxito! ID: ${response.data.id}`);
            setTimeout(() => {
                navigate('/client/home');
            }, 2000);
        } catch (error) {
            setMessage('Error al crear la solicitud');
            console.error('Error al crear la solicitud:', error);
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Formulario de Solicitud
                </Typography>
                {message && <Typography color="error" sx={{ marginTop: 2 }}>{message}</Typography>}
            </Box>

            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Servicio Solicitado"
                                variant="outlined"
                                fullWidth
                                value={serviceName}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Compañía que lo brinda"
                                variant="outlined"
                                fullWidth
                                value={companyName}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Tu Nombre de Usuario"
                                variant="outlined"
                                fullWidth
                                value={formData.username}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Fecha de solicitud"
                                variant="outlined"
                                type="date"
                                fullWidth
                                value={formData.date}
                                InputLabelProps={{ shrink: true }}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Escribe el motivo de tu solicitud"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate(-1)}
                                sx={{ padding: '10px 20px' }}
                            >
                                Atrás
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{ padding: '10px 20px' }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Crear Solicitud'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default RequestForm;
