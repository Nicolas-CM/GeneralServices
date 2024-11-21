// src/components/NewRequestForm.js
import React, { useState } from 'react';

const NewRequestForm = ({ onCreateRequest, userId }) => {
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Pendiente');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateRequest({
      serviceId,
      contractorId: userId,
      date,
      status
    });
    setServiceId('');
    setDate('');
  };

  return (
    <div>
      <h2>Crear Nueva Solicitud</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID de Servicio:
          <input type="text" value={serviceId} onChange={(e) => setServiceId(e.target.value)} required />
        </label>
        <label>
          Fecha:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <button type="submit">Crear Solicitud</button>
      </form>
    </div>
  );
};

export default NewRequestForm;
