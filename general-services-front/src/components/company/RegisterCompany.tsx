import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Alert,
    Box,
    Divider,
} from '@mui/material';

const RegisterCompany = () => {
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
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [companyState, setCompanyState] = useState('');
    const [companyCountry, setCompanyCountry] = useState('');
    const [companyZipCode, setCompanyZipCode] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const navigate = useNavigate();
    const roleIdCompany = 3;

    const handleSubmit = async (e: any) => {
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
                roleId: roleIdCompany,
            };

            const companyDto = {
                name: companyName,
                description: companyDescription,
                phone: companyPhone,
                address: companyAddress,
                city: companyCity,
                state: companyState,
                country: companyCountry,
                zipCode: companyZipCode,
                email: companyEmail,
            };

            const userCompanyRequestDto = {
                user: userRequestDto,
                company: companyDto,
            };

            await axios.post('users/register-company', userCompanyRequestDto);
            setMessage('Usuario y compañía creados exitosamente');
            setMessageType('success');
            setTimeout(() => navigate('/login'), 2000); // Redirigir después de 2 segundos
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMsg = error.response?.data?.message || 'Error al crear el usuario y la compañía';
                setMessage(errorMsg);
            } else {
                setMessage('Error desconocido al crear el usuario y la compañía');
            }
            setMessageType('error');
        }

    };

    return (
        <Container maxWidth='md' sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant='h4' gutterBottom fontWeight='bold' textAlign='center'>
                    Crear Nueva Compañía
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box component='form' onSubmit={handleSubmit} noValidate>
                    {/* Formulario */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Nombre'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Apellido'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Nombre de Usuario'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Correo Electrónico'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Contraseña'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Teléfono'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Dirección'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label='Ciudad'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label='Estado'
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label='País'
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Código Postal'
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                required
                            />
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant='h6' gutterBottom fontWeight='bold'>
                        Datos de la Compañía
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Nombre de la Compañía'
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Descripción'
                                value={companyDescription}
                                onChange={(e) => setCompanyDescription(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Teléfono'
                                value={companyPhone}
                                onChange={(e) => setCompanyPhone(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Dirección'
                                value={companyAddress}
                                onChange={(e) => setCompanyAddress(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label='Ciudad'
                                value={companyCity}
                                onChange={(e) => setCompanyCity(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label='Estado'
                                value={companyState}
                                onChange={(e) => setCompanyState(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label='País'
                                value={companyCountry}
                                onChange={(e) => setCompanyCountry(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Código Postal'
                                value={companyZipCode}
                                onChange={(e) => setCompanyZipCode(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Correo Electrónico'
                                type='email'
                                value={companyEmail}
                                onChange={(e) => setCompanyEmail(e.target.value)}
                                required
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 3 }}>
                        <Button variant='contained' color='primary' type='submit' fullWidth>
                            Crear Usuario y Compañía
                        </Button>
                    </Box>
                </Box>

                {/* Mensaje de éxito o error */}
                {message && (
                    <Box sx={{ mt: 3 }}>

                        <Alert severity={messageType}>{message}</Alert>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default RegisterCompany;
