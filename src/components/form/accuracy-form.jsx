import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import { Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const categoryList = ['vestido', 'tela'];

export const AccuracyForm = ({ defaultData }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    unitCost: '',
    quantity: '',
    description: '',
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <Stack spacing={3}>
      <FormControl>
        <InputLabel id="category">Producto</InputLabel>
        <Select
          labelId="category"
          name="category"
          defaultValue={defaultData ? defaultData.category : ''}
          label="Categoría"
          onChange={handleChange}
        >
          {categoryList.map((category, idx) => (
            <MenuItem key={idx} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          name="cantidad"
          type="number"
          defaultValue={defaultData ? defaultData.cantidad : ''}
          label="Cantidad fisica"
          onChange={handleChange}
        />
      </FormControl>
    </Stack>
  );
};
