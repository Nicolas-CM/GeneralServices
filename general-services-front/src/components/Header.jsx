import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WelcomeBox from './WelcomeBox'; // Import WelcomeBox component

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('token'); // Eliminar token al cerrar sesión
    navigate('/logout');
  };

  const handleLoginHeader = () => {
    setIsAuthenticated(true);
  };

  return (
    <Box>
      {/* Barra de navegación */}
      <AppBar position="static" sx={{ backgroundColor: '#4392f1' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            General Services
          </Typography>
          {!isAuthenticated ? (
            <>
              <Button
                color="inherit"
                startIcon={<LoginIcon />}
                component={Link}
                to="/login"
                sx={{ fontWeight: 'bold', textTransform: 'none' }}
              >
                Iniciar Sesión
              </Button>
              <Button
                color="inherit"
                startIcon={<PersonAddIcon />}
                component={Link}
                to="/register"
                sx={{ fontWeight: 'bold', textTransform: 'none', marginLeft: 1 }}
              >
                Registrarse
              </Button>
            </>
          ) : (
            <IconButton
              color="inherit"
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                padding: 1,
                backgroundColor: '#eee',
                color: '#333',
                '&:hover': { backgroundColor: '#357ae8', color: 'white' },
              }}
            >
              <LogoutIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mostrar WelcomeBox solo si estamos en la raíz */}
      {location.pathname === '/' && <WelcomeBox />}

      {/* Renderizar el contenido de las rutas hijas */}
      <Outlet context={{ handleLoginHeader }} />
    </Box>
  );
};

export default Header;
