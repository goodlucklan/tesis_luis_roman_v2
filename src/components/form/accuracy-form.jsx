import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import { Stack, Button, FormControl } from '@mui/material';

export const AccuracyForm = ({ defaultData, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    cantidad: '',
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <Stack spacing={3}>
      <FormControl>
        <TextField
          name="cantidad"
          type="number"
          defaultValue={defaultData ? defaultData.cantidad : ''}
          label="Cantidad fisica"
          onChange={handleChange}
        />
      </FormControl>
      <Stack
        gap={2}
        direction={{
          xs: 'row-reverse',
          sm: 'row',
        }}
        sx={{
          flexShrink: 0,
          alignSelf: { xs: 'flex-end', sm: 'flex-end' },
        }}
      >
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={() => handleSave(formData)} variant="contained">
          Guardar
        </Button>
      </Stack>
    </Stack>
  );
};
