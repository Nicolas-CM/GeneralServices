import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { keyframes } from '@emotion/react';
import Box from '@mui/material/Box';
import axios from '../../configs/AxiosConfig';
import useUsername from '../../hooks/useUsername';

const swing = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-15deg); }
  100% { transform: rotate(0deg); }
`;

const ClientMenu = () => {
  const { username } = useUsername();
  const [hasUnviewedNotifications, setHasUnviewedNotifications] = useState(false);
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location.pathname);

  const checkNotifications = () => {
    if (!username) return;

    axios.get(`/notifications/receiver/${username}/unviewed`)
      .then(response => {
        setHasUnviewedNotifications(response.data.length > 0);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  };

  useEffect(() => {
    if (prevLocation === '/client/notifications' && location.pathname !== '/client/notifications') {
      checkNotifications();
    }
    setPrevLocation(location.pathname);
  }, [location, prevLocation]);

  return (
    <Box sx={{ marginBottom: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu de Cliente
          </Typography>
          <IconButton color="inherit" component={Link} to="/client/home">
            <HomeIcon />
            <Typography variant="button" display="block">Home</Typography>
          </IconButton>
          <IconButton color="inherit" component={Link} to="/client/requests">
            <AssignmentIcon />
            <Typography variant="button" display="block">Solicitudes</Typography>
          </IconButton>
          <IconButton color="inherit" component={Link} to="/client/billing-history">
            <ReceiptIcon />
            <Typography variant="button" display="block">Facturación</Typography>
          </IconButton>
          <IconButton
            color="inherit"
            component={Link}
            to="/client/notifications"
          >
            <NotificationsIcon sx={{
              animation: hasUnviewedNotifications ? `${swing} 1s infinite` : 'none',
              transformOrigin: 'top center'
            }} />
            <Typography variant="button" display="block">Notificaciones</Typography>
          </IconButton>
          <IconButton color="inherit" component={Link} to="/client/profile">
            <AccountCircleIcon />
            <Typography variant="button" display="block">Perfil</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ClientMenu;