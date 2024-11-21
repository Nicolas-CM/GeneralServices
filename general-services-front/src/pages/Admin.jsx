import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

const Admin = () => {
  const location = useLocation();

  // Verificar la ruta actual para personalizar los enlaces y textos
  const isUserManagement = location.pathname.includes("users");
  const isRoleManagement = location.pathname.includes("roles");
  const isPermissionManagement = location.pathname.includes("permissions");

  return (
    <Box sx={{ marginBottom: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Administración
          </Typography>
          {!isUserManagement && (
            <IconButton color="inherit" component={Link} to="users">
              <PeopleIcon />
              <Typography variant="button" display="block">Usuarios</Typography>
            </IconButton>
          )}
          {!isRoleManagement && (
            <IconButton color="inherit" component={Link} to="roles">
              <SecurityIcon />
              <Typography variant="button" display="block">Roles</Typography>
            </IconButton>
          )}
          {!isPermissionManagement && (
            <IconButton color="inherit" component={Link} to="permissions">
              <VpnKeyIcon />
              <Typography variant="button" display="block">Permisos</Typography>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1" }}>
          {isUserManagement && "Gestión de Usuarios"}
          {isRoleManagement && "Gestión de Roles"}
          {isPermissionManagement && "Gestión de Permisos"}
        </Typography>

        <Box sx={{ marginBottom: 3 }}>
          {isUserManagement && (
            <IconButton color="primary" component={Link} to="create-user">
              <AddIcon />
              <Typography variant="button" display="block">Nuevo Usuario</Typography>
            </IconButton>
          )}
          {isRoleManagement && (
            <IconButton color="primary" component={Link} to="create-role">
              <AddIcon />
              <Typography variant="button" display="block">Nuevo Rol</Typography>
            </IconButton>
          )}
          {isPermissionManagement && (
            <IconButton color="primary" component={Link} to="create-permission">
              <AddIcon />
              <Typography variant="button" display="block">Nuevo Permiso</Typography>
            </IconButton>
          )}
        </Box>

        <Outlet />
      </Box>
    </Box>
  );
};

export default Admin;