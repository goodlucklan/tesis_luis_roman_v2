import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { doc, query, where, getDocs, updateDoc, collection } from 'firebase/firestore';

import {
  Stack,
  Button,
  Dialog,
  Container,
  TextField,
  Typography,
  DialogTitle,
  FormControl,
  DialogContent,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import { DataTable } from 'src/components/table';
import { AccuracyForm } from 'src/components/form/accuracy-form';

import { db } from '../../firebase/firebase';

const InventoryAccuracy = () => {
  const [open, setOpen] = useState(false);
  const [titleForm, setTitleForm] = useState('');
  // const [defaultData, setDefaultData] = useState({});
  const [codigo, setCodigo] = useState('');
  const [data, setData] = useState([]);
  const [productSelected, setProductSelected] = useState();

  const headers = [
    { id: 'producto', label: 'Producto' },
    { id: 'categoria', label: 'Categoria', align: 'center' },
    { id: 'cantidad_fisica', label: 'Cantidad Fisica', align: 'center' },
    { id: 'cantidad', label: 'Cantidad Registrada', align: 'center' },
    { id: 'costo', label: 'Costo', align: 'center' },
    { id: 'fecha_creacion', label: 'Fecha', align: 'center' },
    { id: 'exactitud', label: 'Exactitud del inventario', align: 'center' },
    { id: '' },
  ];

  const handleClose = () => {
    setOpen(false);
  };
  const saveCounter = async (payload) => {
    const productsRef = await collection(db, 'Productos_Nuevos');
    const docRef = await doc(productsRef, productSelected.id);
    await updateDoc(docRef, {
      nombre: productSelected.producto,
      categoria: productSelected.categoria,
      cantidad_fisica: payload.cantidad,
      cantidad: productSelected.cantidad,
      costo: productSelected.costo,
      fecha_creacion: dayjs(productSelected.fecha).format('YYYY-MM-DD'),
      fecha_actualizacion: dayjs().format('YYYY-MM-DD'),
      exactitud: `${(
        parseInt(payload.cantidad, 10) / parseInt(productSelected.cantidad, 10)
      ).toFixed(2)}`,
    });
    await searchInventario();
    setOpen(false);
  };

  const handleEdit = (payload) => {
    setProductSelected(payload);
    console.log(payload);
    setTitleForm('Agregar cantidad fisica');
    setOpen(true);
  };

  const searchInventario = async () => {
    const inventarioCode = await query(
      collection(db, 'Productos_Nuevos'),
      where('codigo_inventario', '==', codigo)
    );
    const inventorySnapShot = await getDocs(inventarioCode);
    const structureData = inventorySnapShot.docs.map((value) => ({
      id: value.id,
      producto: value.data().nombre,
      categoria: value.data().categoria,
      cantidad_fisica: value.data().cantidad_fisica ? value.data().cantidad_fisica : 0,
      cantidad: value.data().cantidad,
      costo: value.data().costo,
      fecha_creacion: dayjs(value.data().fecha_creacion).format('YYYY-MM-DD'),
      exactitud: value.data().exactitud ? value.data().exactitud : 0,
    }));
    setData(structureData);
  };

  return (
    <Container>
      <Toaster position="top-right" />
      <Typography variant="h4">Exactitud del inventario</Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={6}>
        <FormControl color="info">
          <TextField
            type="text"
            name="codigo"
            label="Codigo del inventario"
            onChange={(e) => setCodigo(e.target.value)}
            value={codigo}
          />
        </FormControl>
        <Button
          onClick={searchInventario}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Buscar
        </Button>
      </Stack>
      <DataTable searchParameter="producto" headers={headers} items={data} onEdit={handleEdit} />
      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle>{titleForm}</DialogTitle>
        <DialogContent style={{ paddingTop: 10 }}>
          <AccuracyForm handleClose={() => setOpen(false)} handleSave={saveCounter} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default InventoryAccuracy;
