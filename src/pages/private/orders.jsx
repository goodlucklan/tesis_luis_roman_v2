import React, { useMemo, useState, useEffect } from 'react';
// import { addDoc, collection } from 'firebase/firestore';

import { doc, addDoc, getDocs, updateDoc, collection } from 'firebase/firestore';

import {
  Stack,
  Button,
  Dialog,
  Container,
  Typography,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import { db } from 'src/firebase/firebase';

import Iconify from 'src/components/iconify';
import { DataTable } from 'src/components/table';
import { OrderForm } from 'src/components/form/order-form';

import useOrderData from '../../hooks/use-orders-data';

const myProducts = collection(db, 'Inventario_Apertura');

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [defaultData, setDefaultData] = useState({});
  const [dataInventario, setDataInventario] = useState([]);
  const [productsDataSelect, setProductsDataSelect] = useState([]);
  const { data } = useOrderData();
  const orders = useMemo(() => data, [data]);

  const clearDefaultData = () => {
    setDefaultData({
      producto: '',
      descripcion: '',
      codigo_inventario: '',
      codigo: '',
      cantidad_solicitada: '',
      cantidad_entregada: '',
      fecha: '',
    });
  };

  const completeDataProducts = (code) => {
    const productosSelect = dataInventario.filter((cody) => cody.codigo === code);
    setProductsDataSelect(productosSelect[0].productos);
  };

  useEffect(() => {
    const getProducts = async () => {
      const productsSnapShot = await getDocs(myProducts);
      const productsData = productsSnapShot.docs.map((docky) => ({
        id: docky.id,
        ...docky.data(),
      }));
      setDataInventario(productsData);
    };
    getProducts();
  }, []);

  const addOder = async (payload) => {
    const pedidosRef = await collection(db, 'pedidos');
    const envio = {
      codigo: payload.codigo,
      codigo_inventario: payload.codigo_inventario,
      descripcion: payload.descripcion,
      producto: payload.producto,
      cantidad_solicitada: payload.cantidad_solicitada,
      cantidad_entregada: '',
      fecha: payload.fecha,
    };
    await addDoc(pedidosRef, envio);
    setOpen(false);
  };
  const handleEdit = async (payload) => {
    const pedidosRef = await collection(db, 'pedidos');
    const docRef = await doc(pedidosRef, defaultData.id);
    await updateDoc(docRef, {
      cantidad_entregada: payload.cantidad_entregada,
      tasa_llenado: `${(
        parseInt(payload.cantidad_entregada, 10) / parseInt(payload.cantidad_solicitada, 10)
      ).toFixed(2)}`,
    });
    setOpen(false);
  };
  const onEdit = async (payload) => {
    console.log(payload);
    setDefaultData(payload);
    setOpen(true);
    setActionType('UPDATE');
  };

  const headers = [
    { id: 'codigo', label: 'Codigo', align: 'center' },
    { id: 'producto', label: 'Producto', align: 'center' },
    { id: 'fecha', label: 'Fecha', align: 'center' },
    { id: 'cantidad_entregada', label: 'Cantidad Entregada', align: 'center' },
    { id: 'cantidad_solicitada', label: 'Cantidad Solicitada', align: 'center' },
    { id: 'tasa_llenado', label: 'Tasa de llenado de pedidos', align: 'center' },
    { id: '' },
  ];
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3">Pedidos</Typography>
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
      <DataTable searchParameter="codigo" headers={headers} items={orders} onEdit={onEdit} />
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Pedido</DialogTitle>
        <DialogContent>
          <OrderForm
            completeDataProducts={completeDataProducts}
            inventario={dataInventario}
            products={productsDataSelect.length > 0 ? productsDataSelect : []}
            defaultData={defaultData}
            actionType={actionType}
            handleCancel={() => setOpen(false)}
            handleSave={addOder}
            handleEdit={handleEdit}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Orders;
