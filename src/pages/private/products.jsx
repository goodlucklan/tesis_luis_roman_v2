import { useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { doc, addDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';

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
import { ProductForm } from 'src/components/form/product-form';

import { db } from '../../firebase/firebase';
import useProductsData from '../../hooks/use-products-data';

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [defaultData, setDefaultData] = useState({});
  const [titleForm, setTitleForm] = useState('');
  const { data } = useProductsData();
  const products = useMemo(() => data, [data]);

  const headers = [
    { id: 'name', label: 'Nombre' },
    { id: 'category', label: 'Categoría', align: 'center' },
    { id: 'unitCost', label: 'Costo Unitario', align: 'center' },
    { id: 'quantity', label: 'Cantidad', align: 'center' },
    { id: '' },
  ];

  const notify = () => toast.success('Producto agregado correctamente');
  const notify2 = () => toast.success('Producto editado correctamente');
  const notify3 = () => toast.error('Producto eliminado correctamente');

  const categoryList = ['vestido', 'tela'];

  const handleEdit = (payload) => {
    setTitleForm('Actualizar Producto');
    setDefaultData(payload);
    setOpen(true);
  };

  const handleDelete = async (payload) => {
    const productsRef = await collection(db, 'Productos');
    const docRef = doc(productsRef, payload.id);
    await deleteDoc(docRef);
    notify3();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancelProduct = () => {
    setOpen(false);
  };

  const addProduct = async (payload) => {
    const productsRef = await collection(db, 'Productos');
    if (titleForm === 'Nuevo Producto') {
      await addDoc(productsRef, {
        categoria: payload.category,
        nombre: payload.name,
        cantidad: payload.quantity,
        costo: payload.unitCost,
        descripcion: payload.description,
        talla: '',
        Usuario: {
          nombre: '',
          correo: '',
        },
      });
      setOpen(false);
      notify();
    } else {
      const docRef = await doc(productsRef, defaultData.id);
      await updateDoc(docRef, {
        categoria: payload.category,
        nombre: payload.name,
        cantidad: payload.quantity,
        costo: payload.unitCost,
        descripcion: payload.description,
        Usuario: {
          nombre: '',
          correo: '',
        },
      });
      setOpen(false);
      notify2();
    }
  };

  const clearDefaultData = () => {
    setDefaultData({ name: '', category: '', unitCost: '', quantity: '', description: '' });
  };

  return (
    <Container>
      <Toaster position="top-right" />
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
      <DataTable
        searchParameter="name"
        headers={headers}
        items={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
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
