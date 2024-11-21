// src/pages/Login.js
import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Box, Typography } from '@mui/material';

const Login = () => {
  const [message, setMessage] = useState('');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100vh' }}>
      <LoginForm setMessage={setMessage} message={message} />
      {message && (
        <Typography 
          variant="h6" 
          color="error" 
          sx={{ fontWeight: 'bold', marginTop: 2, textAlign: 'center' }}
        >
          <strong>¡Advertencia!</strong> {message}
        </Typography>
      )}
    </Box>
  );
};  

export default Login;