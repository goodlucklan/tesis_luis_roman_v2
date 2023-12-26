import { useState } from 'react';

import { Stack, Button, TextField, FormControl } from '@mui/material';

export const InventoryOpenForm = ({
  actionType,
  defaultData,
  handleCancel,
  handleSave,
  handleEdit,
}) => {
  const [formData, setFormData] = useState({
    codigo: defaultData ? defaultData.codigo : '',
    fecha: defaultData ? defaultData.fecha : '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Stack spacing={3}>
      <FormControl>
        <TextField type="file" name="File" id="excel" />
      </FormControl>
      <FormControl>
        <TextField
          type="text"
          name="codigo"
          label="Codigo del inventario"
          onChange={handleChange}
          value={formData.codigo}
        />
      </FormControl>
      <FormControl>
        <TextField type="date" name="fecha" onChange={handleChange} value={formData.fecha} />
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
