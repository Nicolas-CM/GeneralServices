// src/pages/ClientHome.js
import React, { useState, useEffect } from 'react';
import axios from '../../configs/AxiosConfig';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, List, ListItem, ListItemText, Paper } from "@mui/material";

const ClientHome = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]); // Para mostrar servicios filtrados
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
  const [message, setMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/services');
        setServices(response.data);
        setFilteredServices(response.data); // Inicialmente muestra todos los servicios
      } catch (error) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        if (error.response) {
          setMessage('Error del servidor al obtener servicios.');
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          setErrorDetails(`${error.response.status} - ${error.response.data.message}`);
        } else {
          setMessage('Error al comunicarse con el servidor.');
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          setErrorDetails(error.message || 'Error desconocido.');
        }
        console.error('Error al obtener servicios:', error);
      }
    };

    fetchServices();
  }, []);

  // Manejar el cambio en la barra de búsqueda
  const handleSearchChange = (e: any) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filtrar servicios por el término de búsqueda
    const filtered = services.filter(service =>
      // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
      service.name.toLowerCase().includes(value)
    );
    setFilteredServices(filtered);
  };

  const handleServiceClick = (serviceId: any) => {
    navigate(`/client/service/${serviceId}`);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1" }}>
        Lista de Servicios
      </Typography>

      {message && (
        <Paper sx={{ padding: 2, marginBottom: 3, backgroundColor: "#ffeb3b" }}>
          <Typography variant="body1">{message}</Typography>
          {errorDetails && <Typography variant="body2"><strong>Detalles:</strong> {errorDetails}</Typography>}
        </Paper>
      )}

      {/* Barra de búsqueda */}
      <Box sx={{ marginBottom: 3 }}>
        <TextField
          fullWidth
          label="Buscar servicios..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>

      {/* Lista de servicios */}
      <List sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}>
        {filteredServices.map((service) => (
          // @ts-expect-error TS(2769): No overload matches this call.
          <ListItem
            // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
            key={service.id}
            button
            // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
            onClick={() => handleServiceClick(service.id)}
            sx={{
              "&:hover": { backgroundColor: "#e0e0e0" },
              padding: "12px 16px",
              cursor: "pointer",
            }}
          >
            // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
            <ListItemText primary={service.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ClientHome;
