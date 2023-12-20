import React from 'react';

import { Stack, Button, Container, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import { DataTable } from 'src/components/table';

const Orders = () => {
  const headers = [
    { id: 'producto', label: 'Producto', align: 'center' },
    {
      id: 'fecha',
      label: 'Fecha',
      align: 'center',
    },
    {
      id: 'cantidad_inicial',
      label: 'Cantidad Inicial',
      align: 'center',
    },
    {
      id: 'stock_promedio',
      label: 'Stock Promedio',
      align: 'center',
    },
  ];
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Pedidos</Typography>
        <Button
          onClick={() => console.log('work')}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Registro
        </Button>
      </Stack>
      <DataTable searchParameter="product" headers={headers} items={[]} />
    </Container>
  );
};

export default Orders;
