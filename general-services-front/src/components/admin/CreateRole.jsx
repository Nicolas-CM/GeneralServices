import React, { useState, useEffect } from 'react';
import axios from '../../configs/AxiosConfig';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography, Paper } from '@mui/material';

const CreateRole = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los permisos disponibles para asignar al rol
    axios.get('permissions')
      .then(response => {
        setPermissions(response.data);
      })
      .catch(error => {
        setMessage('Error al obtener permisos');
        console.error('Error:', error);
      });
  }, []);

  const handlePermissionChange = (permissionId) => {
    setSelectedPermissions(prevPermissions => {
      if (prevPermissions.includes(permissionId)) {
        return prevPermissions.filter(id => id !== permissionId);
      } else {
        return [...prevPermissions, permissionId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roleDto = {
        name,
        description,
        permissions: selectedPermissions
      };
      await axios.post('roles', roleDto);
      setMessage('Rol creado exitosamente');
      navigate('/admin/roles');
    } catch (error) {
      setMessage('Error al crear el rol');
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2, maxWidth: 500, margin: "auto" }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1", textAlign: "center" }}>
        Crear Nuevo Rol
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingrese el nombre del rol"
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Descripción"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ingrese una descripción"
              required
            />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Permisos:
            </Typography>
            <FormGroup>
              {permissions.map(permission => (
                <FormControlLabel
                  key={permission.id}
                  control={
                    <Checkbox
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={() => handlePermissionChange(permission.id)}
                    />
                  }
                  label={permission.name}
                />
              ))}
            </FormGroup>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/roles')}>
              Volver a la lista de roles
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Guardar Rol
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

export default CreateRole;