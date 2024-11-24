import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, TableContainer, Paper } from '@mui/material';

const ContractorToAssignList = ({
  contractors,
  onSelect,
  onClose
}: any) => {

  const handleAssign = (contractorId: any) => {
    onSelect(contractorId);
    onClose();
  };

  if (!Array.isArray(contractors)) {
    return (
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Cargando contratistas...
        </Typography>
      </Box>
    );
  }

  if (contractors.length === 0) {
    return (
      <Box sx={{
        padding: 3,
        textAlign: 'center',
        backgroundColor: '#ffebee',  // Color de fondo suave para resaltar el mensaje
        borderRadius: 2,
        boxShadow: 3,  // Sombra para dar énfasis
        marginBottom: 2,
      }}>
        <Typography
          variant="h6"
          color="error"  // Usamos color de error para hacer el texto más visible
          sx={{ fontWeight: 'bold', marginBottom: 2 }}
        >
          <strong>¡Advertencia!</strong> No tienes contratistas disponibles.
          Nosotros sugerimos rechazar la solicitud para una mejor experiencia con tu cliente.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={onClose}
            sx={{
              padding: '10px 20px',
              fontWeight: 'bold',
              borderRadius: 2,
              marginTop: 2
            }}
          >
            Cerrar
          </Button>
        </Box>
      </Box>
    );
  }


  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2, marginBottom: 1 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: "#4392f1", marginBottom: 3 }}>
        Lista de Contratistas Disponibles
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#ece8ef" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contractors.map(contractor => (
              <TableRow key={contractor.id}>
                <TableCell>{contractor.id}</TableCell>
                <TableCell>{contractor.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAssign(contractor.id)}
                    sx={{ padding: '5px 10px' }}
                  >
                    Asignar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          sx={{ padding: '10px 20px' }}
        >
          Cerrar
        </Button>
      </Box>
    </Box>
  );
};
ContractorToAssignList.propTypes = {
  contractors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ContractorToAssignList;

