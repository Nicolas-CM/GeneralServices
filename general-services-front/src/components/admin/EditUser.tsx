import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from '../../configs/AxiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
// Define los tipos para los datos del usuario y los roles
interface Role {
  id: string;
  name: string;
}

interface User {
  id: string;
  username: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  roles: Role[];
}

const EditUser: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleId, setRoleId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener roles
    axios
      .get<Role[]>('roles')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        setError('Error al obtener roles');
        console.error('Error:', error);
      });

    // Obtener datos del usuario
    axios
      .get<User>(`users/${id}`)
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

  const handleSubmit = (event: FormEvent) => {
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

    axios
      .put(`users/${id}`, userRequestDto)
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
    <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', borderRadius: 2, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#4392f1', textAlign: 'center' }}>
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
                  <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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