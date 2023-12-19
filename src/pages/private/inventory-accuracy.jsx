import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import {
  Stack,
  Button,
  Dialog,
  Container,
  Typography,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import { exactitudInventario } from 'src/_mock/movements';

import Iconify from 'src/components/iconify';
import { DataTable } from 'src/components/table';
import { AccuracyForm } from 'src/components/form/accuracy-form';

const InventoryAccuracy = () => {
  const [open, setOpen] = useState(false);
  const [titleForm, setTitleForm] = useState('');
  const [defaultData, setDefaultData] = useState({});
  const [actionType, setActionType] = useState('');

  const headers = [
    { id: 'producto', label: 'Producto' },
    { id: 'cantidad', label: 'Cantidad', align: 'center' },
    { id: 'cantidad_fisico', label: 'Cantidad Fisica', align: 'center' },
    { id: 'fecha', label: 'Fecha', align: 'center' },
    { id: 'resultado', label: 'Exactitud del inventario', align: 'center' },
    { id: '' },
  ];

  const clearDefaultData = () => {
    setDefaultData({
      product: '',
      movementType: '',
      quantity: '',
      reason: '',
      category: '',
      location: '',
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const notify = () => toast.error('Solo se puede realizar el conteo los 28 de cada mes');

  const handleOpen = () => {
    setTitleForm('Nuevo Movimiento');
    setActionType('CREATE');
    clearDefaultData();
    setOpen(true);
    // const fechaActual = new Date();
    // const fechaEspecifica = new Date('2023-12-28');
    // if (fechaActual.toDateString() === fechaEspecifica.toDateString()) {
    //   setTitleForm('Nuevo Movimiento');
    //   setActionType('CREATE');
    //   clearDefaultData();
    //   setOpen(true);
    // } else {
    //   notify();
    // }
  };

  return (
    <Container>
      <Toaster position="top-right" />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Exactitud del inventario</Typography>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Registro
        </Button>
      </Stack>
      <DataTable searchParameter="name" headers={headers} items={exactitudInventario} />
      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle>{titleForm}</DialogTitle>
        <DialogContent style={{ paddingTop: 10 }}>
          <AccuracyForm actionType={actionType} defaultData={defaultData} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default InventoryAccuracy;
