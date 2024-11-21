import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";

const ClientMenu = () => (
  <Box sx={{ marginBottom: 4 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Menu de Cliente
        </Typography>
        <IconButton color="inherit" component={Link} to="/client/home">
          <HomeIcon />
          <Typography variant="button" display="block">
            Home
          </Typography>
        </IconButton>
        <IconButton color="inherit" component={Link} to="/client/requests">
          <AssignmentIcon />
          <Typography variant="button" display="block">
            Solicitudes
          </Typography>
        </IconButton>
        <IconButton color="inherit" component={Link} to="/client/billing-history">
          <ReceiptIcon />
          <Typography variant="button" display="block">
            Facturación
          </Typography>
        </IconButton>
        <IconButton color="inherit" component={Link} to="/client/profile">
          <AccountCircleIcon />
          <Typography variant="button" display="block">
            Perfil
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  </Box>
);

export default ClientMenu;
