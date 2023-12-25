import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  doc,
  query,
  where,
  addDoc,
  getDocs,
  updateDoc,
  // deleteDoc,
  collection,
} from 'firebase/firestore';

import {
  Stack,
  Button,
  Dialog,
  Select,
  MenuItem,
  Container,
  Typography,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogContent,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import { DataTable } from 'src/components/table';
import { MovementForm } from 'src/components/form/movement-form';

import { db } from '../../firebase/firebase';

const inventario = collection(db, 'Inventario_Apertura');
const products = collection(db, 'Productos_Nuevos');

export default function InputsAndOutputsPage() {
  const headers = [
    { id: 'producto', label: 'Producto' },
    { id: 'codigo_inventario', label: 'Codigo Inventario', align: 'center' },
    { id: 'tipo_movimiento', label: 'Tipo de Movimiento', align: 'center' },
    { id: 'cantidad', label: 'Cantidad', align: 'center' },
    { id: 'fecha', label: 'Fecha', align: 'center' },
    { id: 'locacion', label: 'Locación', align: 'center' },
    { id: 'status', label: 'Estado', align: 'center' },
    { id: '' },
  ];

  const typesOfMovementsList = ['entrada', 'salida'];
  const locationList = ['tienda', 'almacen'];

  const [open, setOpen] = useState(false);
  const [titleForm, setTitleForm] = useState('');
  const [defaultData, setDefaultData] = useState({});
  const [actionType, setActionType] = useState('');
  const [inventoryData, setInventoryData] = useState([]);
  const [productosData, setProductosData] = useState([]);
  const [movesData, setMovesData] = useState([]);

  useEffect(() => {
    const getInventory = async () => {
      const inventarioSnapShot = await getDocs(inventario);
      const inventarioSelect = inventarioSnapShot.docs.map((docky) => ({
        id: docky.id,
        codigo: docky.data().codigo,
      }));
      setInventoryData(inventarioSelect);
    };
    getInventory();
  }, []);

  const getTableProductsByCode = async (code) => {
    const productos = await query(products, where('codigo_inventario', '==', code));
    const productosSnapShot = await getDocs(productos);
    const productsTable = productosSnapShot.docs.map((productDoc) => ({
      id: productDoc.id,
      ...productDoc.data(),
    }));
    setProductosData(productsTable);
    const moves = await query(collection(db, 'Movimiento_Nuevo'), where('codigo', '==', code));
    const movesSnapShot = await getDocs(moves);
    const movesTable = movesSnapShot.docs.map((productDoc) => ({
      id: productDoc.id,
      producto: productDoc.data().producto,
      codigo_inventario: productDoc.data().codigo,
      tipo_movimiento: productDoc.data().Tipo_Movimiento,
      cantidad: productDoc.data().cantidad,
      fecha: productDoc.data().fecha,
      locacion: productDoc.data().locacion,
      status: productDoc.data().aprobacion,
    }));
    setMovesData(movesTable);
  };

  const approveProduct = async (product) => {
    const kardexRef = await collection(db, 'Kardex');
    const MovesRef = await collection(db, 'Movimiento_Nuevo');
    const docRef = await doc(MovesRef, product.id);
    await updateDoc(docRef, {
      aprobacion: 'Aprobado',
    });
    const filterDataProducts = productosData.filter((value) => value.nombre === product.producto);
    const cantidad_actualizada = filterDataProducts[0].cantidad_actualizada
      ? filterDataProducts[0].cantidad_actualizada
      : filterDataProducts[0].cantidad;
    const KardexADD = {
      codigo_inventario: filterDataProducts[0].codigo_inventario,
      producto: product.producto,
      usuario: 'Leslie Torres',
      cantidad_inicial: cantidad_actualizada,
      entrada: product.tipo_movimiento === 'entrada' ? product.cantidad : 0,
      salida: product.tipo_movimiento === 'salida' ? product.cantidad : 0,
      saldo:
        product.tipo_movimiento === 'entrada'
          ? `${parseInt(cantidad_actualizada, 10) + parseInt(product.cantidad, 10)}`
          : `${parseInt(cantidad_actualizada, 10) - parseInt(product.cantidad, 10)}`,
    };
    await addDoc(kardexRef, KardexADD);
    const docProductRef = await doc(products, filterDataProducts[0].id);
    await updateDoc(docProductRef, {
      cantidad_actualizada:
        product.tipo_movimiento === 'entrada'
          ? `${parseInt(cantidad_actualizada, 10) + parseInt(product.cantidad, 10)}`
          : `${parseInt(cantidad_actualizada, 10) - parseInt(product.cantidad, 10)}`,
    });
    // await addDoc(kardexRef, {
    //   producto: product.producto,
    //   usuario: "Leslie Torres",
    // })
    // const MovesRef = await collection(db, 'Movimiento');
    // const docRef = await doc(MovesRef, product.id);
    // // const docRefPedido = await doc(pedidos, orders[0].id);
    // await updateDoc(docRef, {
    //   aprobacion: 'Aprobado',
    // });
    // const kardex = await collection(db, "Kardex");
    // await addDoc(kardex, {

    // })
    // await updateDoc(docRefPedido, {
    //   cantidad_entregada: product.quantity,
    //   tasa_llenado: `${(
    //     parseInt(product.quantity, 10) / parseInt(orders[0].cantidad_solicitada, 10)
    //   ).toFixed(2)}`,
    // });
    notifyCustom('Movimiento Aprobado');
  };

  const notifyCustom = (text) => toast.success(text);

  const deleteProduct = async (payload) => {};

  const handleClose = () => {
    setOpen(false);
  };

  const editMovement = (product) => {
    setOpen(true);
    console.log('approveProduct: ', product);
  };

  const clearDefaultData = () => {
    setDefaultData({
      product: '',
      movementType: '',
      quantity: '',
      reason: '',
      location: '',
    });
  };

  const cancelMovement = () => {
    setOpen(false);
  };

  const addMovement = async (payload) => {
    const MovesRef = await collection(db, 'Movimiento_Nuevo');
    await addDoc(MovesRef, {
      producto: payload.product,
      codigo: inventoryData[0].codigo,
      Tipo_Movimiento: payload.movementType,
      cantidad: payload.quantity,
      fecha: !payload.fecha ? dayjs().format('YYYY-MM-DD') : payload.fecha,
      locacion: payload.location,
      motivo: payload.reason,
      aprobacion: 'Pendiente',
    });
    setOpen(false);
    notifyCustom('Movimiento Aprobado');
  };

  return (
    <Container>
      <Toaster position="top-right" />
      <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" mb={2}>
          Entradas y Salidas
        </Typography>
        <FormControl
          fullWidth
          sx={{
            marginBottom: 2,
          }}
        >
          <InputLabel id="inventario">Inventario</InputLabel>
          <Select
            labelId="inventario"
            name="inventario"
            label="Inventario"
            onChange={(e) => getTableProductsByCode(e.target.value)}
          >
            {inventoryData.map((inventory, idx) => (
              <MenuItem key={idx} value={inventory.codigo}>
                {inventory.codigo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          fullWidth
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
        searchParameter="nombre"
        headers={headers}
        items={movesData}
        onApprove={approveProduct}
        onEdit={editMovement}
        onDelete={deleteProduct}
      />
      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle>{titleForm}</DialogTitle>
        <DialogContent style={{ paddingTop: 10 }}>
          <MovementForm
            actionType={actionType}
            products={productosData}
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
