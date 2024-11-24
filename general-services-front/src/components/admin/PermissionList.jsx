import React, { useEffect, useState } from 'react';
import axios from '../../configs/AxiosConfig';
import { Link } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function PermissionList() {
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPermissionId, setSelectedPermissionId] = useState(null);

  useEffect(() => {
    axios.get('permissions')
      .then((response) => {
        setPermissions(response.data);
        console.log("Lista de permisos:", JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        setError('Error al obtener los permisos');
        console.error('Error:', error);
      });
  }, []);

  const handleDelete = (permissionId) => {
    setSelectedPermissionId(permissionId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    axios.delete(`permissions/${selectedPermissionId}`)
      .then(() => {
        setPermissions(permissions.filter(permission => permission.id !== selectedPermissionId));
        setDeleteDialogOpen(false);
        setSelectedPermissionId(null);
      })
      .catch((error) => {
        console.error('Error eliminando el permiso:', error);
        alert('Hubo un error al eliminar el permiso.');
        setDeleteDialogOpen(false);
      });
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2, marginBottom: 3 }}>
      {error && <div>{error}</div>}

      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1" }}>
        Lista de Permisos
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#ece8ef" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Recurso</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map(permission => (
              <TableRow key={permission.id}>
                <TableCell>{permission.id}</TableCell>
                <TableCell>{permission.name}</TableCell>
                <TableCell>{permission.resource}</TableCell>
                <TableCell>
                  <Button
                      component={Link}
                      to={`/admin/edit-permission/${permission.id}`}
                      variant="outlined"
                      color="primary"
                      size="small"
                    >
                      Editar
                    </Button>
                  <Button
                    onClick={() => handleDelete(permission.id)}
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ marginLeft: 1 }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este permiso? Esta acción no puede deshacerse.
          </Typography>
        </DialogContent>
        <DialogActions>
        <Button onClick={confirmDelete} color="primary" variant="contained">
            Confirmar
          </Button>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary" variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PermissionList;
