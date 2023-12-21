import { useState } from 'react';

import { Stack, Select, Button, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

export const OrderForm = ({
  actionType,
  defaultData,
  products,
  handleCancel,
  handleSave,
  handleEdit,
}) => {
  const [formData, setFormData] = useState({
    codigo: defaultData ? defaultData.codigo : '',
    producto: defaultData ? defaultData.producto : '',
    cantidad_solicitada: defaultData ? defaultData.cantidad_solicitada : '',
    fecha: defaultData ? defaultData.fecha : '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Stack spacing={3}>
      <FormControl>
        <TextField
          type="text"
          name="codigo"
          label="Codigo del Producto"
          onChange={handleChange}
          value={formData.codigo}
        />
      </FormControl>
      <FormControl>
        <InputLabel id="producto">Producto</InputLabel>
        <Select
          labelId="producto"
          name="producto"
          label="Producto"
          onChange={handleChange}
          value={formData.producto}
        >
          {products.map((product, idx) => (
            <MenuItem key={idx} value={product.name}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          type="number"
          name="cantidad_solicitada"
          label="Cantidad solicitada"
          onChange={handleChange}
          value={formData.cantidad_solicitada}
        />
      </FormControl>
      <FormControl>
        <TextField
          type="date"
          name="fecha"
          label="Fecha del pedido"
          onChange={handleChange}
          value={formData.fecha}
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
