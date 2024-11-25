// src/components/ErrorBoundary.jsx
import React from 'react';
import { useRouteError } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

const ErrorBoundary = () => {
    const error = useRouteError() as { status?: number; statusText?: string; message?: string };
    const navigate = useNavigate();
    console.error(error);

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f4f6f8',
                padding: 3,
            }}
        >
            <ErrorOutlineIcon sx={{ fontSize: 100, color: '#d32f2f', marginBottom: 2 }} />
            <Typography
                variant="h3"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    color: '#d32f2f',
                    textAlign: 'center',
                }}
            >

                {error.status === 404 ? '404 - Página no encontrada' : '¡Vaya! Algo salió mal'}
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    color: '#757575',
                    marginBottom: 4,
                }}
            >

                {error.status === 404
                    ? 'Lo sentimos, la página que estás buscando no existe.'

                    : error.statusText || error.message}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoHome}
                sx={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    textTransform: 'none',
                }}
            >
                Volver al inicio
            </Button>
        </Box>
    );
};

export default ErrorBoundary;
