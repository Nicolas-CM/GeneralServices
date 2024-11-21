import { useEffect, useState, React } from 'react';
import axios from '../../configs/AxiosConfig';
import useUsername from '../../hooks/useUsername';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Alert
} from "@mui/material";

const ContractorList = () => {
  const { username, error: usernameError } = useUsername();
  const [contractors, setContractors] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedContractorId, setSelectedContractorId] = useState(null);

  const handleDelete = (contractorId) => {
    setSelectedContractorId(contractorId);
    setDeleteDialogOpen(true);
  };


  // Obtener contratistas por userId del dueño de la compañía
  useEffect(() => {
    console.log("username:", username);
    if (!username) return;

    axios.get(`contractors/owner/${username}`)
      .then(response => {
        setContractors(response.data); // Guardamos los contratistas
        console.log("Respuesta del backend:", response);
      })
      .catch(err => {
        setError('Error al obtener los contratistas');
        console.error(err);
      });
  }, [username]);


  // Validación de errores y éxito
  if (usernameError) {
    return <div>{usernameError}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(contractors)) {
    return <div>Cargando...</div>;
  }
  if (contractors.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50hv',
          textAlign: 'center',
        }}
      >
        <Alert severity="info" sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            No tienes contratistas registrados.
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Pero no te preocupes, puedes crear uno nuevo fácilmente.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/company/create-contractor')}
            sx={{ borderRadius: '25px' }}
          >
            Crear Nuevo Contratista
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2, marginBottom: 3 }}>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este contratista? Esta acción no puede deshacerse.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              axios.delete(`contractors/${selectedContractorId}`)
                .then(() => {
                  setContractors(contractors.filter(contractor => contractor.id !== selectedContractorId));
                  setDeleteDialogOpen(false);
                })
                .catch(err => {
                  console.error('Error eliminando el contratista:', err);
                  alert('Hubo un error al eliminar el contratista.');
                  setDeleteDialogOpen(false);
                });
            }}
            color="primary"
            variant="contained"
          >
            Confirmar
          </Button>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary" variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1" }}>
        Lista de Contratistas
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/company/create-contractor")}
        sx={{ marginBottom: 3 }}
      >
        Nuevo Contratista
      </Button>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#ece8ef" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Disponible</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contractors.map((contractor) => (
              <TableRow key={contractor.id}>
                <TableCell>{contractor.id}</TableCell>
                <TableCell>{contractor.name}</TableCell>
                <TableCell>{contractor.available ? "Sí" : "No"}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      component={Link}
                      to={`/company/edit-contractor/${contractor.id}`}
                      variant="outlined"
                      color="primary"
                      size="small"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(contractor.id)}
                      variant="contained"
                      color="secondary"
                      size="small"
                    >
                      Deshabilitar
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

export default ContractorList;
