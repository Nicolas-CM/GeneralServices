import React, { useEffect, useState } from 'react';
import axios from '../../configs/AxiosConfig';
import PropTypes from 'prop-types';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const DinamicServiceList = ({
  setSelectedServiceId,
  setName,
  setDescription,
  setCategoryId
}: any) => {
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

        const categoryRequests = response.data.map((service: any) => axios.get(`/categories/${service.categoryId}`)
        );

        Promise.all(categoryRequests)
          .then(categoryResponses => {
            const fetchedCategories = categoryResponses.map(res => res.data);
            // @ts-expect-error TS(2345): Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
      service.name.toLowerCase().includes(value) ||
      // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
      service.description.toLowerCase().includes(value) ||
      // @ts-expect-error TS(2339): Property 'categoryId' does not exist on type 'neve... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
    const category = categories.find(cat => cat.id === categoryId);
    // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
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
                // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f1f1f1" } }}
              >
                // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                <TableCell>{service.id}</TableCell>
                // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                <TableCell>{service.name}</TableCell>
                // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
                <TableCell>{service.description}</TableCell>
                // @ts-expect-error TS(2339): Property 'categoryId' does not exist on type 'neve... Remove this comment to see the full error message
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

