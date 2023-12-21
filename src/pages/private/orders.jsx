import React, { useMemo, useState } from 'react';

import {
  Stack,
  Button,
  Dialog,
  Container,
  Typography,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import { DataTable } from 'src/components/table';
import { OrderForm } from 'src/components/form/order-form';

import useOrderData from '../../hooks/use-orders-data';

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [defaultData, setDefaultData] = useState({});
  const { data } = useOrderData();
  const orders = useMemo(() => data, [data]);

  const clearDefaultData = () => {
    setDefaultData({
      producto: '',
      codigo: '',
      cantidad_solicitada: '',
      fecha: '',
    });
  };
  const headers = [
    { id: 'codigo', label: 'Codigo', align: 'center' },
    { id: 'producto', label: 'Producto', align: 'center' },
    {
      id: 'fecha',
      label: 'Fecha',
      align: 'center',
    },
    {
      id: 'cantidad_solicitada',
      label: 'Cantidad Solicitada',
      align: 'center',
    },
    {
      id: 'cantidad_entregada',
      label: 'Cantidad Entregada',
      align: 'center',
    },
    {
      id: 'tasa_llenado',
      label: 'Tasa de llenado de pedidos',
      align: 'center',
    },
    { id: '' },
  ];
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Pedidos</Typography>
        <Button
          onClick={() => {
            setOpen(true);
            setActionType('CREATE');
            clearDefaultData();
          }}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Registro
        </Button>
      </Stack>
      <DataTable searchParameter="codigo" headers={headers} items={orders} />
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Pedido</DialogTitle>
        <DialogContent>
          <OrderForm
            products={[]}
            defaultData={defaultData}
            actionType={actionType}
            handleCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Orders;
