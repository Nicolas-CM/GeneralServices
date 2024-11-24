import React, { useEffect, useState } from 'react';
import axios from '../../configs/AxiosConfig';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [refresh] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    axios.get('users')
      .then((response) => {
        setUsers(response.data);
        //console.log("Lista de usuarios:", JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        setError('Error al obtener los usuarios');
        console.error('Error:', error);
      });
  }, [refresh]);

  const handleDelete = (userId: any) => {
    setSelectedUserId(userId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    axios.delete(`users/${selectedUserId}`)
      .then(() => {
        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
        setUsers(users.filter(user => user.id !== selectedUserId));
        setDeleteDialogOpen(false);
        setSelectedUserId(null);
      })
      .catch((error) => {
        console.error('Error eliminando el usuario:', error);
        alert('Hubo un error al eliminar el usuario.');
        setDeleteDialogOpen(false);
      });
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2 }}>
      {error && <Typography color="error">{error}</Typography>}

      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1" }}>
        Lista de Usuarios
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#ece8ef" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Id</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Apellido</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Nombre de Usuario</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Correo Electrónico</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Rol(es)</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
              <TableRow key={user.id}>
                // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                <TableCell>{user.id}</TableCell>
                // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                <TableCell>{user.name}</TableCell>
                // @ts-expect-error TS(2339): Property 'lastName' does not exist on type 'never'... Remove this comment to see the full error message
                <TableCell>{user.lastName}</TableCell>
                // @ts-expect-error TS(2339): Property 'username' does not exist on type 'never'... Remove this comment to see the full error message
                <TableCell>{user.username}</TableCell>
                // @ts-expect-error TS(2339): Property 'email' does not exist on type 'never'.
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  // @ts-expect-error TS(2339): Property 'roles' does not exist on type 'never'.
                  {(user.roles || []).map((role: any, index: any) => (
                    <span key={index}>
                      {role.name}
                      // @ts-expect-error TS(2339): Property 'roles' does not exist on type 'never'.
                      {index < user.roles.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </TableCell>
                // @ts-expect-error TS(2339): Property 'status' does not exist on type 'never'.
                <TableCell>{user.status ? 'Activo' : 'Inactivo'}</TableCell>
                <TableCell>
                  // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                  <Button component={Link} to={`/admin/edit-user/${user.id}`} variant="outlined" color="primary" size="small" sx={{ marginRight: 1 }}>
                    Editar
                  </Button>
                  // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                  <Button onClick={() => handleDelete(user.id)} variant="contained" color="secondary" size="small">
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
            ¿Estás seguro de que deseas eliminar este usuario? Esta acción no puede deshacerse.
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

}

export default UserList;
