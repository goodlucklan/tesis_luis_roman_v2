import dayjs from 'dayjs';
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

import useMovimientoData from 'src/hooks/use-movement-data';

import Iconify from 'src/components/iconify';
import { DataTable } from 'src/components/table';
import { MovementForm } from 'src/components/form/movement-form';

import { db } from '../../firebase/firebase';
import useProductsData from '../../hooks/use-products-data';

export default function InputsAndOutputsPage() {
  const { data } = useProductsData();
  const { data: Movimientos } = useMovimientoData();
  const products = useMemo(() => data, [data]);
  const movimientoTable = useMemo(() => Movimientos, [Movimientos]);
  const headers = [
    { id: 'product', label: 'Producto' },
    { id: 'movementType', label: 'Tipo de Movimiento', align: 'center' },
    { id: 'quantity', label: 'Cantidad', align: 'center' },
    { id: 'category', label: 'Categoría', align: 'center' },
    { id: 'date', label: 'Fecha', align: 'center' },
    { id: 'location', label: 'Locación', align: 'center' },
    { id: 'status', label: 'Estado', align: 'center' },
    { id: '' },
  ];

  const typesOfMovementsList = ['entrada', 'salida'];
  const locationList = ['tienda', 'almacen'];

  const [open, setOpen] = useState(false);
  const [titleForm, setTitleForm] = useState('');
  const [defaultData, setDefaultData] = useState({});
  const [actionType, setActionType] = useState('');

  const approveProduct = async (product) => {
    const MovesRef = await collection(db, 'Movimiento');

    const docRef = await doc(MovesRef, product.id);

    await updateDoc(docRef, {
      aprobacion: 'Aprobado',
    });
    notifyCustom('Movimiento Aprobado');
  };

  const notify = () => toast.success('Movimiento registrado correctamente');

  const notify2 = () =>
    toast.success('No puedes sacar mas productos de los que existen registrados');

  const notifyCustom = (text) => toast.success(text);

  const deleteProduct = async (payload) => {
    const MovesRef = await collection(db, 'Movimiento');
    const foundItem = products.filter((item) => item.name === payload.product);
    const myProducts = await collection(db, 'Productos');
    const docRef = await doc(myProducts, foundItem[0].id);
    await updateDoc(docRef, {
      cantidad: `${foundItem[0].quantity + parseInt(payload.quantity, 10)}`,
    });
    const docRef2 = await doc(MovesRef, payload.id);
    await deleteDoc(docRef2);
    notifyCustom('Movimiento eliminado correctamente');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editMovement = (product) => {
    console.log('approveProduct: ', product);
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

  const addMovement = async (payload) => {
    const MovesRef = await collection(db, 'Movimiento');
    const foundItem = products.filter((item) => item.name === payload.product);
    if (
      payload.movementType === 'salida' &&
      parseInt(payload.quantity, 10) > foundItem[0].quantity
    ) {
      notify2();
      return;
    }
    const myProducts = await collection(db, 'Productos');
    const docRef = await doc(myProducts, foundItem[0].id);
    await addDoc(MovesRef, {
      producto: payload.product,
      Tipo_Movimiento: payload.movementType,
      cantidad: payload.quantity,
      fecha: dayjs().format('YYYY-MM-DD'),
      locacion: payload.location,
      motivo: payload.reason,
      categoria: payload.category,
      aprobacion: false,
    });
    if (payload.movementType === 'salida') {
      await updateDoc(docRef, {
        cantidad: `${foundItem[0].quantity - parseInt(payload.quantity, 10)}`,
      });
    } else {
      await updateDoc(docRef, {
        cantidad: `${foundItem[0].quantity + parseInt(payload.quantity, 10)}`,
      });
    }
    notify();
    setOpen(false);
  };

  return (
    <Container>
      <Toaster position="top-right" />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Entradas y Salidas</Typography>
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
        items={movimientoTable}
        onApprove={approveProduct}
        onDelete={deleteProduct}
      />
      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle>{titleForm}</DialogTitle>
        <DialogContent style={{ paddingTop: 10 }}>
          <MovementForm
            actionType={actionType}
            products={products}
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
