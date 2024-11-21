import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import Box from '@mui/material/Box';

const CompanyMenu = () => (
  <Box sx={{ marginBottom: 4 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Menu de Compañia
        </Typography>
        <IconButton color="inherit" component={Link} to="/company/home">
          <HomeIcon />
          <Typography variant="button" display="block">Home</Typography>
        </IconButton>
        <IconButton color="inherit" component={Link} to="/company/requests">
          <AssignmentIcon />
          <Typography variant="button" display="block">Solicitudes</Typography>
        </IconButton>
        <IconButton color="inherit" component={Link} to="/company/contractor">
          <BuildIcon />
          <Typography variant="button" display="block">Contratista</Typography>
        </IconButton>
        <IconButton color="inherit" component={Link} to="/company/services">
          <MiscellaneousServicesIcon />
          <Typography variant="button" display="block">Servicios</Typography>
        </IconButton>
        <IconButton color="inherit" component={Link} to="/company/profile">
          <AccountCircleIcon />
          <Typography variant="button" display="block">Perfil</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  </Box>
);

export default CompanyMenu;