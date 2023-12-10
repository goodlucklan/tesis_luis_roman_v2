import { useState } from 'react';

import {
  Stack,
  Button,
  Dialog,
  Container,
  Typography,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import { movements } from 'src/_mock/movements';

import Iconify from 'src/components/iconify';
import { DataTable } from 'src/components/table';
import { MovementForm } from 'src/components/form/movement-form';

export default function MovementsPage() {
  const headers = [
    { id: 'product', label: 'Producto' },
    { id: 'movementType', label: 'Tipo de Movimiento', align: 'center' },
    { id: 'quantity', label: 'Cantidad', align: 'center' },
    { id: 'reason', label: 'Motivo', align: 'center' },
    { id: 'category', label: 'Categoría', align: 'center' },
    { id: 'location', label: 'Locación', align: 'center' },
    { id: '' },
  ];

  const productList = [
    'Vestido Corte Imperial',
    'Tela de algodon',
    'TELA DE CORDUROI',
    'vestido de noche',
  ];
  const typesOfMovementsList = ['entrada', 'salida'];
  const locationList = ['tienda', 'almacen'];

  const [open, setOpen] = useState(false);
  const [titleForm, setTitleForm] = useState('');
  const [defaultData, setDefaultData] = useState({});
  const [actionType, setActionType] = useState('');

  const openEditModal = (payload) => {
    setTitleForm('Actualizar Movimiento');
    setActionType('UPDATE');
    setDefaultData(payload);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editMovement = (product) => {
    console.log('approveProduct: ', product);
  };

  const deleteMovement = (product) => {
    console.log('deleteProduct: ', product);
  };

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

  const cancelMovement = () => {
    setOpen(false);
  };

  const addMovement = (payload) => {
    console.log('addMovement: ', payload);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Movimientos</Typography>

        <Button
          onClick={() => {
            setTitleForm('Nuevo Movimiento');
            setActionType('CREATE');
            clearDefaultData();
            setOpen(true);
          }}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Movimiento
        </Button>
      </Stack>
      <DataTable
        searchParameter="product"
        headers={headers}
        items={movements}
        onEdit={openEditModal}
        onDelete={deleteMovement}
      />
      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle>{titleForm}</DialogTitle>
        <DialogContent style={{ paddingTop: 10 }}>
          <MovementForm
            actionType={actionType}
            products={productList}
            typesOfMovements={typesOfMovementsList}
            locations={locationList}
            defaultData={defaultData}
            handleCancel={cancelMovement}
            handleSave={addMovement}
            handleEdit={editMovement}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
