import React, { useState, useEffect } from 'react';
import axios from '../../configs/AxiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography, TextField } from '@mui/material';


const EditContractor = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const { id } = useParams();  // Obtener el ID del contratista de la URL
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos del contratista a editar
    axios.get(`contractors/${id}`)
      .then(response => {
        const contractorData = response.data;
        setName(contractorData.name);  // Establecemos el nombre del contratista
      })
      .catch(error => {
        setMessage('Error al obtener los datos del contratista');
        console.error('Error:', error);
      });
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const contractorDto = {
        name  // Solo estamos actualizando el nombre
      };

      // Enviar los datos del contratista actualizado
      await axios.put(`contractors/${id}`, contractorDto);
      setMessage('Contratista actualizado exitosamente');
      navigate(-1);  // Redirigir a la página anterior
    } catch (error) {
      setMessage('Error al actualizar el contratista');
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', borderRadius: 2, maxWidth: 500, margin: 'auto' }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#4392f1', textAlign: 'center' }}>
        Editar Contratista
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 3 }}>
          <TextField
            fullWidth
            label="Nombre"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingrese el nombre del contratista"
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ display: 'block', width: '100%', marginBottom: 2 }}
        >
          Actualizar Contratista
        </Button>
      </form>
      {message && (
        <Typography variant="body2" color="success.main" sx={{ marginBottom: 3 }}>
          {message}
        </Typography>
      )}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate(-1)}
        sx={{ display: 'block', width: '100%' }}
      >
        Volver a la página anterior
      </Button>
    </Box>
  );

};

export default EditContractor;
