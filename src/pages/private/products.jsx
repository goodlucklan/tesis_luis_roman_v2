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

import { products } from 'src/_mock/product';

import Iconify from 'src/components/iconify';
import { DataTable } from 'src/components/table';
import { ProductForm } from 'src/components/form/product-form';

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [defaultData, setDefaultData] = useState({});
  const [titleForm, setTitleForm] = useState('');

  const headers = [
    { id: 'name', label: 'Nombre' },
    { id: 'category', label: 'Categoría', align: 'center' },
    { id: 'unitCost', label: 'Costo Unitario', align: 'center' },
    { id: 'quantity', label: 'Cantidad', align: 'center' },
    { id: '' },
  ];

  const categoryList = [
    'Bronze',
    'Soft',
    'Frozen',
    'Concrete',
    'Rubber',
    'Granite',
    'Steel',
    'Cotton',
  ];

  const handleEdit = (payload) => {
    setTitleForm('Actualizar Producto');
    setDefaultData(payload);
    setOpen(true);
  };

  const handleDelete = (payload) => {
    console.log('Delete: ', payload);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancelProduct = () => {
    setOpen(false);
  };

  const addProduct = (payload) => {
    console.log('addProduct: ', payload);
  };

  const clearDefaultData = () => {
    setDefaultData({ name: '', category: '', unitCost: '', quantity: '', description: '' });
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Productos</Typography>

        <Button
          onClick={() => {
            setTitleForm('Nuevo Producto');
            clearDefaultData();
            setOpen(true);
          }}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Producto
        </Button>
      </Stack>
      <DataTable headers={headers} items={products} onEdit={handleEdit} onDelete={handleDelete} />
      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle>{titleForm}</DialogTitle>
        <DialogContent style={{ paddingTop: 10 }}>
          <ProductForm
            categories={categoryList}
            defaultData={defaultData}
            handleCancel={cancelProduct}
            handleSave={addProduct}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
