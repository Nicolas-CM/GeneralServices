import React from 'react';
import { Box, Container, Paper, Typography, Grid } from '@mui/material';

const WelcomeBox = () => {
    return (
        <Box sx={{
            paddingY: 4, paddingTop: 15
        }}>
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#4392f1' }}>
                        Bienvenido a General Services
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2, fontSize: '1.1rem', color: '#757575' }}>
                        Aquí puedes gestionar servicios, solicitudes y mucho más. Comienza a explorar las funcionalidades
                        disponibles.
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper
                                elevation={2}
                                sx={{
                                    padding: 2,
                                    borderRadius: 2,
                                    backgroundColor: '#e3ebff',
                                    '&:hover': { backgroundColor: '#4392f1', color: 'white' },
                                    transition: 'all 0.3s ease-in-out',
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Servicios
                                </Typography>
                                <Typography variant="body2">
                                    Explora los servicios que ofrecemos y encuentra la solución ideal para tus necesidades.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper
                                elevation={2}
                                sx={{
                                    padding: 2,
                                    borderRadius: 2,
                                    backgroundColor: '#e3ebff',
                                    '&:hover': { backgroundColor: '#4392f1', color: 'white' },
                                    transition: 'all 0.3s ease-in-out',
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Solicitudes
                                </Typography>
                                <Typography variant="body2">
                                    Revisa, administra o crea nuevas solicitudes directamente desde tu cuenta.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper
                                elevation={2}
                                sx={{
                                    padding: 2,
                                    borderRadius: 2,
                                    backgroundColor: '#e3ebff',
                                    '&:hover': { backgroundColor: '#4392f1', color: 'white' },
                                    transition: 'all 0.3s ease-in-out',
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Configuración
                                </Typography>
                                <Typography variant="body2">
                                    Accede a las configuraciones de tu perfil para personalizar tu experiencia.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    )
}

export default WelcomeBox;
