import React, { useState, useEffect } from 'react';
import axios from '../../configs/AxiosConfig';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los roles disponibles para asignar al usuario
    axios.get('roles')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        setMessage('Error al obtener roles');
        console.error('Error:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRequestDto = {
        username,
        name,
        lastName,
        email,
        password,
        phone,
        address,
        city,
        state,
        country,
        zipCode,
        roleId,
      };
      await axios.post('users', userRequestDto);
      setMessage('Usuario creado exitosamente');
      navigate('/admin/users');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage(error.message || 'Error al crear el usuario');
      }
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2, maxWidth: 500, margin: "auto" }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1", textAlign: "center" }}>
        Crear Nuevo Usuario
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Nombre de Usuario"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Apellido"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Contraseña"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Teléfono"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Dirección"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Ciudad"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Estado"
              variant="outlined"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="País"
              variant="outlined"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Código Postal"
              variant="outlined"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Rol</InputLabel>
              <Select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                label="Rol"
                required
              >
                <MenuItem value="">
                  <em>Seleccione un rol</em>
                </MenuItem>
                {roles.map(role => (
                  <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/users')}>
              Volver a la lista de usuarios
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Guardar Usuario
            </Button>
          </Box>
        </form>
        {message && (
          <Typography variant="body2" color="success.main" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default CreateUser;