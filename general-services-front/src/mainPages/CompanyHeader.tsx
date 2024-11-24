import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; // Agregar Outlet para renderizar rutas hijas
import CompanyMenu from '../components/company/CompanyMenu';
import useUsername from '../hooks/useUsername';
import StompService from '../Utils/StompService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { keyframes } from '@mui/system';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const CompanyHeader = () => {

  const { username, error: usernameError } = useUsername();
  const [reload, setReload] = useState(false);
  console.log("username: ", username);
  console.log("usernameError: ", usernameError);
  
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!username) return;


    StompService.connect(() => {
      StompService.subscribeToNotifications(username, onNotificationReceived);
      console.log("STOMP connection established.");
    });
    
    const onNotificationReceived = (message: any) => {
      const notification = JSON.parse(message.body);
      setNotification(notification.message);
      setReload(prev => !prev);
    };

    

    return () => {
      StompService.unsubscribe(`notifications_${username}`);
      StompService.disconnect();
    };
  }, [username]);

  const handleClose = () => {
    setNotification(null);
  };

  return (
    <div>
      <CompanyMenu />
      <Snackbar open={!!notification} autoHideDuration={6000} onClose={handleClose}>
        <Alert 
          onClose={handleClose} 
          severity="info" 
          sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
          icon={<NotificationsIcon sx={{ animation: `${bounce} 2s infinite` }} />}
        >
          {notification}
        </Alert>
      </Snackbar>
      {/* Este es el lugar donde las rutas hijas se renderizarán */}
      {reload ? <Outlet key={Date.now()} /> : <Outlet />}
    </div>
  );
};

export default CompanyHeader;