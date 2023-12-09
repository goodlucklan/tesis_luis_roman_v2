import { useState } from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import { Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export const ProductForm = ({ categories, defaultData, handleCancel, handleSave }) => {
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
        <TextField
          name="name"
          defaultValue={defaultData ? defaultData.name : ''}
          label="Nombre"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <InputLabel id="category">Categoría</InputLabel>
        <Select
          labelId="category"
          name="category"
          defaultValue={defaultData ? defaultData.category : ''}
          label="Categoría"
          onChange={handleChange}
        >
          {categories.map((category, idx) => (
            <MenuItem key={idx} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          name="unitCost"
          defaultValue={defaultData ? defaultData.unitCost : ''}
          label="Costo unitario"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <TextField
          name="quantity"
          defaultValue={defaultData ? defaultData.quantity : ''}
          label="Cantidad"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <TextField
          name="description"
          defaultValue={defaultData ? defaultData.description : ''}
          label="Descripción"
          multiline
          rows={4}
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
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button
          onClick={() => {
            handleSave(formData);
          }}
          variant="contained"
        >
          Guardar
        </Button>
      </Stack>
    </Stack>
  );
};

ProductForm.prototype = {
  categories: PropTypes.array,
  defaultData: PropTypes.object,
  handleCancel: PropTypes.func,
  handleSave: PropTypes.func,
};
