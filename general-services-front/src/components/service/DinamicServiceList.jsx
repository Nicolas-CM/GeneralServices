import React, { useEffect, useState } from 'react';
import axios from '../../configs/AxiosConfig';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const DinamicServiceList = ({ setSelectedServiceId, setName, setDescription, setCategoryId }) => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // Obtener todos los servicios
  useEffect(() => {
    axios.get('/services')
      .then(response => {
        setServices(response.data);
        setFilteredServices(response.data);

        const categoryRequests = response.data.map(service =>
          axios.get(`/categories/${service.categoryId}`)
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

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = services.filter(service =>
      service.name.toLowerCase().includes(value) ||
      service.description.toLowerCase().includes(value) ||
      getCategoryName(service.categoryId).toLowerCase().includes(value)
    );
    setFilteredServices(filtered);
  };

  const handleServiceSelect = (service) => {
    setSelectedServiceId(service.id);
    setName(service.name);
    setDescription(service.description);
    setCategoryId(service.categoryId);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Categoría no encontrada';
  };

  if (error) {
    return <div>{error}</div>;
  }


    return (
      <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2, marginBottom: 3 }}>
        <Typography variant="h6" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1" }}>
          Buscar Servicios
        </Typography>
  
        <TextField
          placeholder="Buscar servicios..."
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 3 }}
        />
  
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#ece8ef" }}>
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
                  sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f1f1f1" } }}
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
  

export default DinamicServiceList;
