import React, { useEffect, useState } from 'react';
import axios from '../../configs/AxiosConfig';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Chip } from '@mui/material';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  useEffect(() => {
    axios.get('roles')
      .then((response) => {
        setRoles(response.data);
        const permissionIds = response.data.flatMap((role: any) => role.selectedPermissions);
        return axios.get(`permissions?ids=${permissionIds.join(',')}`);
      })
      .then((response) => {
        setPermissions(response.data);
      })
      .catch((error) => {
        setError('Error al obtener los roles y permisos');
        console.error('Error:', error);
      });
  }, []);

  const handleDelete = (roleId: any) => {
    setSelectedRoleId(roleId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    axios.delete(`roles/${selectedRoleId}`)
      .then(() => {
        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
        setRoles(roles.filter(role => role.id !== selectedRoleId));
        setDeleteDialogOpen(false);
        setSelectedRoleId(null);
      })
      .catch((error) => {
        console.error('Error eliminando el rol:', error);
        alert('Hubo un error al eliminar el rol.');
        setDeleteDialogOpen(false);
      });
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2 }}>
      {error && <Typography color="error">{error}</Typography>}

      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1" }}>
        Lista de Roles
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#ece8ef" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Descripción</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Permisos</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map(role => (
              // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
              <TableRow key={role.id}>
                // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                <TableCell>{role.id}</TableCell>
                // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                <TableCell>{role.name}</TableCell>
                // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  // @ts-expect-error TS(2339): Property 'selectedPermissions' does not exist on t... Remove this comment to see the full error message
                  {(role.selectedPermissions || []).map((permissionId: any, index: any) => {
                    // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                    const permission = permissions.find(p => p.id === permissionId);
                    return permission ? (
                      // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                      <Chip key={`${permission.id}-${index}`} label={permission.name} sx={{ margin: 0.5 }} />
                    ) : null;
                  })}
                </TableCell>
                <TableCell>
                  // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                  <Button component={Link} to={`/admin/edit-role/${role.id}`} variant="outlined" color="primary" size="small" sx={{ marginRight: 1 }}>
                    Editar
                  </Button>
                  // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                  <Button onClick={() => handleDelete(role.id)} variant="contained" color="secondary" size="small">
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
            ¿Estás seguro de que deseas eliminar este rol? Esta acción no puede deshacerse.
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

export default RoleList;
