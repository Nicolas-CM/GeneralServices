import React, { useEffect, useState } from 'react';
import axios from '../../configs/AxiosConfig';
import useUsername from '../../hooks/useUsername';
import { useNavigate } from 'react-router-dom';
import DinamicServiceList from './DinamicServiceList'; // Componente para lista de servicios
import { Box, Button, TextField, Select, MenuItem, Typography, Grid } from '@mui/material';

const RegisterService = () => {
  const { username, error: usernameError } = useUsername();
  const [companyId, setCompanyId] = useState(null);
  interface Category {
    id: string;
    name: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Obtener el ID de la compañía del usuario
  useEffect(() => {
    if (!username) return;

    axios.get(`companies/owner/${username}`)
      .then(response => {
        setCompanyId(response.data.id);
      })
      .catch(err => {
        setError('Error al obtener la compañía');
        console.error(err);
      });
  }, [username]);

  // Obtener la lista de categorías
  useEffect(() => {
    axios.get('/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(err => {
        setError('Error al obtener las categorías');
        console.error(err);
      });
  }, []);

  // Manejo de envío del formulario
  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!companyId) {
      setError('No se ha podido obtener el ID de la compañía.');
      return;
    }

    if (selectedServiceId) {
      // Actualizar servicio existente
      axios.get(`/services/${selectedServiceId}`)
        .then(response => {
          const serviceData = response.data;
          const updatedCompanyIds = [...new Set([...serviceData.companyIds, companyId])]; // Evitar duplicados

          axios.put(`/services/${selectedServiceId}`, { ...serviceData, companyIds: updatedCompanyIds })
            .then(() => {
              setSuccess('Servicio actualizado exitosamente!');
              navigate(-1);
            })
            .catch(err => {
              setError('Error al actualizar el servicio');
              console.error(err);
            });
        })
        .catch(err => {
          setError('Error al obtener el servicio');
          console.error(err);
        });
    } else {
      // Crear nuevo servicio
      const serviceData = {
        name,
        description,
        categoryId,
        companyIds: [companyId],
      };

      axios.post('/services', serviceData)
        .then(() => {
          setSuccess('Servicio creado y asociado exitosamente!');
          navigate(-1);
        })
        .catch(err => {
          setError('Error al crear el servicio');
          console.error(err);
        });
    }
  };

  // Mostrar errores de usuario
  if (usernameError) {
    return <div>{usernameError}</div>;
  }

  // Mostrar errores generales
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#ece8ef',
        borderRadius: 4,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 4,
      }}
    >
      <Typography
        variant='h4'
        sx={{
          marginBottom: 4,
          fontWeight: 'bold',
          color: '#4392f1',
          textAlign: 'center',
        }}
      >
        Registrar Servicio
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{
          width: '100%',
          maxWidth: '1200px',
          backgroundColor: '#ffffff',
          borderRadius: 3,
          padding: 4,
          boxShadow: 3,
        }}
      >
        {/* Seleccionar Servicio Existente */}
        <Grid item xs={12} md={6}>
          <Typography
            variant='h6'
            sx={{
              marginBottom: 2,
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
            }}
          >
            Seleccionar Servicio Existente
          </Typography>
          <Box
            sx={{
              border: '1px solid #e7f0ff',
              borderRadius: 2,
              padding: 3,
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <DinamicServiceList
              setSelectedServiceId={setSelectedServiceId}
              setName={setName}
              setDescription={setDescription}
              setCategoryId={setCategoryId}
            />
          </Box>
        </Grid>

        {/* Crear Nuevo Servicio */}
        <Grid item xs={12} md={6}>
          <Typography
            variant='h6'
            sx={{
              marginBottom: 2,
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
            }}
          >
            Crear Nuevo Servicio
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
              border: '1px solid #e7f0ff',
              borderRadius: 2,
              padding: 3,
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <TextField
              fullWidth
              label='Nombre'
              variant='outlined'
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!!selectedServiceId}
              required={!selectedServiceId}
              sx={{ marginBottom: 3 }}
            />
            <TextField
              fullWidth
              label='Descripción'
              multiline
              minRows={3}
              variant='outlined'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!!selectedServiceId}
              required={!selectedServiceId}
              sx={{ marginBottom: 3 }}
            />
            <Typography
              variant='body1'
              sx={{ marginBottom: 1, color: '#6c757d', fontWeight: 'bold' }}
            >
              Categoría
            </Typography>
            <Select
              fullWidth
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={!!selectedServiceId}
              required={!selectedServiceId}
              displayEmpty
              sx={{ marginBottom: 3 }}
            >
              <MenuItem value=''>
                <em>-- Seleccionar --</em>
              </MenuItem>
              {categories.map((category) => (

                <MenuItem key={category.id} value={category.id}>

                  {category.name}
                </MenuItem>
              ))}
            </Select>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 3,
              }}
            >
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => navigate(-1)}
              >
                Atrás
              </Button>
              <Button variant='contained' color='primary' type='submit'>
                {selectedServiceId
                  ? 'Agregar Servicio Existente'
                  : 'Crear Nuevo Servicio'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Mensaje de éxito */}
      {success && (
        <Typography
          variant='body1'
          sx={{
            marginTop: 4,
            color: 'green',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {success}
        </Typography>
      )}
    </Box>
  );

};

export default RegisterService;
