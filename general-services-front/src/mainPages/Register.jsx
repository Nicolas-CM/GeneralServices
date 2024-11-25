import React from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';

const Register = () => {
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', bold: 'true' }}>
                {/* Título */}
                <Typography variant="h4" gutterBottom>
                    Registro
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                    Selecciona el tipo de usuario para completar tu registro.
                </Typography>

                {/* Botones de opciones */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        href="/register/client"
                        sx={{ textTransform: 'none' }}
                    >
                        Cliente
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        href="/register/company"
                        sx={{ textTransform: 'none' }}
                    >
                        Compañía
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
