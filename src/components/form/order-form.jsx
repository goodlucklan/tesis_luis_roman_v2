import { useState } from 'react';

import { Stack, Select, Button, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

export const OrderForm = ({
  actionType,
  defaultData,
  products,
  inventario,
  completeDataProducts,
  handleCancel,
  handleSave,
  handleEdit,
}) => {
  const [formData, setFormData] = useState({
    codigo: defaultData ? defaultData.codigo : '',
    descripcion: defaultData ? defaultData.descripcion : '',
    producto: defaultData ? defaultData.producto : '',
    codigo_inventario: defaultData ? defaultData.codigo_inventario : '',
    cantidad_solicitada: defaultData ? defaultData.cantidad_solicitada : '',
    cantidad_entregada: defaultData ? defaultData.cantidad_entregada : '',
    fecha: defaultData ? defaultData.fecha : '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name === 'codigo_inventario') {
      completeDataProducts(event.target.value);
    }
  };

  return (
    <Stack spacing={4} mt={4}>
      <FormControl>
        <TextField
          disabled={actionType !== 'CREATE'}
          type="text"
          name="codigo"
          label="Codigo del pedido"
          onChange={handleChange}
          value={formData.codigo}
        />
      </FormControl>
      <FormControl>
        <TextField
          disabled={actionType !== 'CREATE'}
          type="text"
          name="descripcion"
          label="Descripcion del pedido"
          onChange={handleChange}
          value={formData.descripcion}
        />
      </FormControl>
      <FormControl>
        <InputLabel id="codigo_inventario">Inventario</InputLabel>
        <Select
          disabled={actionType !== 'CREATE'}
          labelId="inventario"
          name="codigo_inventario"
          label="Inventario"
          onChange={handleChange}
          value={formData.codigo_inventario}
        >
          {inventario.map((product, idx) => (
            <MenuItem key={idx} value={product.codigo}>
              {product.codigo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="producto">Producto</InputLabel>
        <Select
          disabled={actionType !== 'CREATE'}
          labelId="producto"
          name="producto"
          label="Producto"
          onChange={handleChange}
          value={formData.producto}
        >
          {products.map((product, idx) => (
            <MenuItem key={idx} value={product.nombre}>
              {product.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          disabled={actionType !== 'CREATE'}
          type="number"
          name="cantidad_solicitada"
          label="Cantidad solicitada"
          onChange={handleChange}
          value={formData.cantidad_solicitada}
        />
      </FormControl>
      <FormControl>
        <TextField
          disabled={actionType === 'CREATE'}
          type="number"
          name="cantidad_entregada"
          label="Cantidad Entregada"
          onChange={handleChange}
          value={formData.cantidad_entregada}
        />
      </FormControl>
      <FormControl>
        <TextField
          disabled={actionType !== 'CREATE'}
          type="date"
          name="fecha"
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
