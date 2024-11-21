import React, { useState, useEffect } from 'react';
import axios from '../../configs/AxiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const EditRole = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [message, setMessage] = useState('');
  const { id } = useParams();  // Obtener el ID del rol de la URL
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los permisos disponibles para mostrar en la lista de selección
    axios.get('permissions')
      .then(response => {
        setPermissions(response.data);
      })
      .catch(error => {
        setMessage('Error al obtener permisos');
        console.error('Error:', error);
      });

    // Obtener los datos del rol a editar
    axios.get(`roles/${id}`)
      .then(response => {
        const roleData = response.data;
        setName(roleData.name);
        setDescription(roleData.description);
        setSelectedPermissions((roleData.permissions || []).map(permission => permission.id)); // Marcar permisos actuales
      })
      .catch(error => {
        setMessage('Error al obtener los datos del rol');
        console.error('Error:', error);
      });
  }, [id]);

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
        selectedPermissions
      };

      // Enviar los datos del rol actualizado
      await axios.put(`roles/${id}`, roleDto);
      setMessage('Rol actualizado exitosamente');
      navigate('/admin/roles');
    } catch (error) {
      setMessage('Error al actualizar el rol');
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2, maxWidth: 500, margin: "auto" }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1", textAlign: "center" }}>
        Editar Rol
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
              Actualizar Rol
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

export default EditRole;
