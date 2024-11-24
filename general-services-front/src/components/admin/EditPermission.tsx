import React, { useEffect, useState } from 'react';
import axios from '../../configs/AxiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

const EditPermission = () => {
  const [name, setName] = useState('');
  const [resource, setResource] = useState('');
  const [message, setMessage] = useState('');
  const { id } = useParams();  // Obtener el ID del permiso desde la URL
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos del permiso a editar
    axios.get(`permissions/${id}`)
      .then(response => {
        const permissionData = response.data;
        setName(permissionData.name);
        setResource(permissionData.resource);
      })
      .catch(error => {
        setMessage('Error al obtener los datos del permiso');
        console.error('Error:', error);
      });
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const permissionDto = {
        name,
        resource
      };

      // Enviar los datos del permiso actualizado
      await axios.put(`permissions/${id}`, permissionDto);
      setMessage('Permiso actualizado exitosamente');
      navigate('/admin/permissions');
    } catch (error) {
      setMessage('Error al actualizar el permiso');
      console.error('Error:', error);
    }
  };
  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2, maxWidth: 500, margin: "auto" }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1", textAlign: "center" }}>
        Editar Permiso
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
              Actualizar Permiso
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

export default EditPermission;
