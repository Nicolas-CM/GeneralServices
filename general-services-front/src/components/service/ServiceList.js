import React, { useEffect, useState } from 'react';
import axios from '../../configs/AxiosConfig';
import useUsername from '../../hooks/useUsername';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,  Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";

function ServiceList() {
  const { username, error: usernameError } = useUsername();
  const [userId, setUserId] = useState(null);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]); // Para almacenar las categorías
  const [error, setError] = useState('');
  const  navigate  = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  // Paso 1: Obtención del userId con el username
  useEffect(() => {
    if (!username) return;

    axios.get(`users/username/${username}`)
      .then(response => {
        setUserId(response.data);
      })
      .catch(err => {
        setError('Error al obtener el ID del usuario');
        console.error(err);
      });
  }, [username]);

  // Paso 2: Obtención de servicios asociados al userId
  useEffect(() => {
    if (!userId) return;

    axios.get(`/services/user/${userId}`)
      .then((response) => {
        console.log("Servicios obtenidos:", response.data);
        setServices(response.data);

        // Obtener las categorías asociadas a los servicios
        const categoryIds = response.data.map(service => service.categoryId);
        if (categoryIds.length > 0) {
          // Enviar los categoryIds al backend para obtener las categorías
          axios.post('/categories/by-ids', categoryIds)
            .then(categoryResponse => {
              setCategories(categoryResponse.data); // Guardamos las categorías obtenidas
              console.log("Categorías obtenidas:", categoryResponse.data);
            })
            .catch(err => {
              setError('Error al obtener las categorías');
              console.error(err);
            });
        }
      })
      .catch((err) => {
        setError(err.message || 'Error al obtener los servicios');
        console.error(err);
      });
  }, [userId]);

  const handleOpenDeleteDialog = (serviceId) => {
    setSelectedServiceId(serviceId);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    axios
      .delete(`companies/owner/${username}/services/${selectedServiceId}`)
      .then(() => {
        setServices(services.filter((service) => service.id !== selectedServiceId));
        setDeleteDialogOpen(false);
      })
      .catch((err) => {
        console.error("Error eliminando el servicio:", err);
        alert("Hubo un error al eliminar el servicio.");
        setDeleteDialogOpen(false);
      });
  };
  

  if (usernameError) {
    return <div>{usernameError}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Función para obtener el nombre de la categoría a partir del ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Categoría no encontrada';
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2, marginBottom: 3 }}>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este servicio? Esta acción no puede deshacerse.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary" variant="contained">
            Confirmar
          </Button>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary" variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1" }}>
        Lista de Servicios
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/company/create-service")}
        sx={{ marginBottom: 3 }}
      >
        Nuevo Servicio
      </Button>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#ece8ef" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Descripción</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Categoría</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>{getCategoryName(service.categoryId)}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      onClick={() => handleOpenDeleteDialog(service.id)}
                      variant="contained"
                      color="secondary"
                      size="small"
                    >
                      Eliminar
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServiceList;
