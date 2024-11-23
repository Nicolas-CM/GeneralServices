import React, { useState } from 'react';
import axios from '../../configs/AxiosConfig';
import PropTypes from 'prop-types';
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, Alert } from '@mui/material';


const BillingForm = ({ requestId, userId, contractorId, onClose, onComplete }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const billingData = {
        requestId,
        amount,
        paymentMethod,
        contractorId,
        userId,
        paymentDate// Usar payment_date en lugar de date
      };
      // Realizamos la petición al backend para crear la factura
      await axios.post('/billings', billingData);
      console.log('Factura creada:', billingData);
      await axios.put(`contractors/available/${contractorId}`, { available: true });
      onComplete(billingData); // Llama a la función onComplete con los datos de facturación
      onClose(); // Cierra el formulario
    } catch (err) {
      setError('Hubo un error al crear la factura');
      console.error(err);
    }
  };

  return (

    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2, maxWidth: 600, margin: 'auto' }}>

      <Typography variant="h5" sx={{ fontWeight: 'bold', color: "#4392f1", marginBottom: 2 }}>
        Crear Factura
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Monto"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            variant="outlined"
            InputProps={{
              startAdornment: <Typography variant="body2" sx={{ marginLeft: 1 }}>$</Typography>
            }}
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Método de pago</InputLabel>
            <Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              label="Método de pago"
            >
              <MenuItem value="Efectivo">Efectivo</MenuItem>
              <MenuItem value="Tarjeta de Crédito">Tarjeta de Crédito</MenuItem>
              <MenuItem value="Tarjeta de Débito">Tarjeta de Débito</MenuItem>
              <MenuItem value="PayPal">PayPal</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Fecha de Pago"
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            required
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" type="submit" sx={{ width: '48%' }}>
            Crear Factura
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose} sx={{ width: '48%' }}>
            Cancelar
          </Button>
        </Box>
      </form>
    </Box>
  );

};
BillingForm.propTypes = {
  requestId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  contractorId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default BillingForm;
