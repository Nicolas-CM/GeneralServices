import React, { useState, useEffect } from 'react';
import axios from '../../configs/AxiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const EditUser = () => {
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
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('roles')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        setError('Error al obtener roles');
        console.error('Error:', error);
      });

    axios.get(`users/${id}`)
      .then(response => {
        const userData = response.data;
        setUsername(userData.username);
        setName(userData.name);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setPhone(userData.phone);
        setAddress(userData.address);
        setCity(userData.city);
        setState(userData.state);
        setCountry(userData.country);
        setZipCode(userData.zipCode);
        setRoleId(userData.roles[0]?.id || '');
        setUser(userData);
      })
      .catch(error => {
        setError('Error al obtener los datos del usuario');
        console.error('Error:', error);
      });
  }, [id]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const userRequestDto = {
      id,
      username,
      password,
      email,
      name,
      lastName,
      phone,
      address,
      city,
      state,
      country,
      zipCode,
      roleId,
    };
    axios.put(`users/${id}`, userRequestDto)
      .then(() => {
        navigate('/admin/users');
      })
      .catch(error => {
        setError('Error al actualizar el usuario');
        console.error('Error:', error);
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1", textAlign: "center" }}>
        Editar Usuario
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
        <form onSubmit={handleSubmit}>
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
                  // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
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
              Actualizar Usuario
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditUser;