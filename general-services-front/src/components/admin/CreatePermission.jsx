import React, { useState } from 'react';
import axios from '../../configs/AxiosConfig';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const CreatePermission = () => {
  const [name, setName] = useState('');
  const [resource, setResource] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const permissionDto = { name, resource };
      await axios.post('permissions', permissionDto);
      setMessage('Permiso creado exitosamente');
      navigate('/admin/permissions');
    } catch (error) {
      setMessage('Error al crear el permiso');
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2, maxWidth: 500, margin: "auto" }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1", textAlign: "center" }}>
        Crear Nuevo Permiso
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingrese el nombre del permiso"
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Recurso"
              variant="outlined"
              value={resource}
              onChange={(e) => setResource(e.target.value)}
              placeholder="Ingrese el recurso asociado"
              required
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/permissions')}>
              Volver a la lista de permisos
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Guardar Permiso
            </Button>
          </Box>
        </form>
        {message && (
          <Typography variant="body2" color="success.main" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default CreatePermission;