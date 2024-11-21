import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';

const CompanyHome = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Sección de bienvenida */}
      <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido al Portal de Gestión de Compañías
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          Este es tu espacio centralizado para administrar todos los aspectos de tu compañía. Desde aquí, puedes:
        </Typography>
        <Box sx={{ textAlign: 'left', mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Funcionalidades disponibles:
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            - Gestionar y visualizar las solicitudes de tus clientes.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            - Asignar contratistas a proyectos o tareas específicas.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            - Administrar los servicios que ofrece tu compañía.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            - Actualizar y personalizar la información del perfil de tu empresa.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default CompanyHome;
