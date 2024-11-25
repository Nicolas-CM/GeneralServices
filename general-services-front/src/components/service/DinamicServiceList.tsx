import React, { useEffect, useState } from 'react';
import axios from '../../configs/AxiosConfig';
import PropTypes from 'prop-types';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const DinamicServiceList = ({
  setSelectedServiceId,
  setName,
  setDescription,
  setCategoryId
}: any) => {
  interface Service {
    id: number;
    name: string;
    description: string;
    categoryId: number;
  }

  interface Category {
    id: number;
    name: string;
  }

  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // Obtener todos los servicios
  useEffect(() => {
    axios.get('/services')
      .then(response => {
        setServices(response.data);
        setFilteredServices(response.data);

        const categoryRequests = response.data.map((service: any) => axios.get(`/categories/${service.categoryId}`)
        );

        Promise.all(categoryRequests)
          .then(categoryResponses => {
            const fetchedCategories = categoryResponses.map(res => res.data);

            setCategories(fetchedCategories);
          })
          .catch(err => {
            setError('Error al obtener las categorías');
            console.error(err);
          });
      })
      .catch(err => {
        setError('Error al obtener los servicios');
        console.error(err);
      });
  }, []);

  const handleSearchChange = (e: any) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = services.filter(service =>

      service.name.toLowerCase().includes(value) ||

      service.description.toLowerCase().includes(value) ||

      getCategoryName(service.categoryId).toLowerCase().includes(value)
    );
    setFilteredServices(filtered);
  };

  const handleServiceSelect = (service: any) => {
    setSelectedServiceId(service.id);
    setName(service.name);
    setDescription(service.description);
    setCategoryId(service.categoryId);
  };

  const getCategoryName = (categoryId: any) => {

    const category = categories.find(cat => cat.id === categoryId);

    return category ? category.name : 'Categoría no encontrada';
  };

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', borderRadius: 2, marginBottom: 3 }}>
      <Typography variant='h6' sx={{ marginBottom: 3, fontWeight: 'bold', color: '#4392f1' }}>
        Buscar Servicios
      </Typography>

      <TextField
        placeholder='Buscar servicios...'
        value={searchTerm}
        onChange={handleSearchChange}
        variant='outlined'
        fullWidth
        sx={{ marginBottom: 3 }}
      />

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#ece8ef' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Descripción</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Categoría</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices.map((service) => (
              <TableRow

                key={service.id}
                onClick={() => handleServiceSelect(service)}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f1f1f1' } }}
              >

                <TableCell>{service.id}</TableCell>

                <TableCell>{service.name}</TableCell>

                <TableCell>{service.description}</TableCell>

                <TableCell>{getCategoryName(service.categoryId)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

DinamicServiceList.propTypes = {
  setSelectedServiceId: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setCategoryId: PropTypes.func.isRequired,
};

export default DinamicServiceList;

