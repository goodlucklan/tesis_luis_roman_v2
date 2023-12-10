import { useState } from 'react';
import PropTypes from 'prop-types';

import { Stack, Select, Button, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

export const MovementForm = ({
  actionType,
  defaultData,
  products,
  typesOfMovements,
  locations,
  handleCancel,
  handleSave,
  handleEdit,
}) => {
  const [formData, setFormData] = useState({
    product: defaultData ? defaultData.product : '',
    movementType: defaultData ? defaultData.movementType : '',
    quantity: defaultData ? defaultData.quantity : '',
    reason: defaultData ? defaultData.reason : '',
    category: defaultData ? defaultData.category : '',
    location: defaultData ? defaultData.location : '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Stack spacing={3}>
      <FormControl>
        <InputLabel id="product">Producto</InputLabel>
        <Select
          labelId="product"
          name="product"
          label="Producto"
          onChange={handleChange}
          value={formData.product}
        >
          {products.map((product, idx) => (
            <MenuItem key={idx} value={product}>
              {product}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="movementType">Tipo de Movimiento</InputLabel>
        <Select
          labelId="movementType"
          name="movementType"
          label="Tipo de Movimiento"
          onChange={handleChange}
          value={formData.movementType}
        >
          {typesOfMovements.map((type, idx) => (
            <MenuItem key={idx} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          type="text"
          name="quantity"
          label="Cantidad"
          onChange={handleChange}
          value={formData.quantity}
        />
      </FormControl>
      <FormControl>
        <TextField
          type="text"
          name="reason"
          label="Motivo"
          onChange={handleChange}
          value={formData.reason}
        />
      </FormControl>
      <FormControl>
        <TextField
          type="text"
          value={formData.category}
          name="category"
          label="Categoría"
          disabled
        />
      </FormControl>
      <FormControl>
        <InputLabel id="location">Locación</InputLabel>
        <Select
          labelId="location"
          name="location"
          label="Locación"
          onChange={handleChange}
          value={formData.location}
        >
          {locations.map((type, idx) => (
            <MenuItem key={idx} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
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
        {actionType === 'CREATE' && (
          <Button
            onClick={() => {
              handleSave(formData);
            }}
            variant="contained"
          >
            Guardar
          </Button>
        )}
        {actionType === 'UPDATE' && (
          <Button
            onClick={() => {
              handleEdit(formData);
            }}
            variant="contained"
          >
            Actualizar
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

MovementForm.prototype = {
  actionType: PropTypes.string,
  defaultData: PropTypes.array,
  typesOfMovements: PropTypes.array,
  locations: PropTypes.array,
  handleCancel: PropTypes.func,
  handleSave: PropTypes.func,
  handleEdit: PropTypes.func,
};
