import React, { useState, useEffect } from 'react';
import { query, where, getDocs, collection } from 'firebase/firestore';

import {
  Stack,
  Select,
  MenuItem,
  Container,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';

import { DataTable } from 'src/components/table';

import { db } from '../../firebase/firebase';

const inventarioRef = collection(db, 'Inventario_Apertura');
const productosRef = collection(db, 'Productos_Nuevos');
const movimientoRef = collection(db, 'Movimiento_Nuevo');

const Rotacion_Inventario = () => {
  const [dataInventario, setDataInventario] = useState([]);
  const [tableRotation, setTableRotation] = useState([]);

  useEffect(() => {
    const obtenerInventario = async () => {
      const inventarioSnapShot = await getDocs(inventarioRef);
      const inventarioData = inventarioSnapShot.docs.map((doc) => ({
        id: doc.id,
        codigo: doc.data().codigo,
      }));
      setDataInventario(inventarioData);
    };
    obtenerInventario();
  }, []);

  const getTableRotationByCode = async (code) => {
    console.log('code', code);
    const productos = await query(productosRef, where('codigo_inventario', '==', code));
    const productosSnapShot = await getDocs(productos);
    const productsData = productosSnapShot.docs.map((productDoc) => ({
      id: productDoc.id,
      ...productDoc.data(),
    }));
    const salidas = await query(movimientoRef, where('codigo', '==', code));
    const salidasSnapShot = await getDocs(salidas);
    const salidasData = salidasSnapShot.docs.map((salidaDoc) => ({
      id: salidaDoc.id,
      ...salidaDoc.data(),
    }));
    console.log('productos', productsData);
    console.log('salidas', salidasData);
    const resultTable = productsData.map((item, index) => {
      const movimientoTable = salidasData.find(
        (movimientoItem) => movimientoItem.producto === item.nombre
      );
      const unidadesDeSalida = movimientoTable ? movimientoTable.cantidad : 0;
      const unidadesDeStock = item.cantidad;
      const rotacionDeInventario =
        unidadesDeStock !== 0 ? ((unidadesDeSalida / unidadesDeStock) * 100).toFixed(2) : 0;
      return {
        id: index,
        codigo_Inventario: code,
        producto: item.nombre,
        unidades_de_salida: unidadesDeSalida,
        unidades_de_stock: unidadesDeStock,
        rotacion_de_inventario: `${rotacionDeInventario}%`,
      };
    });
    console.log(resultTable);
    setTableRotation(resultTable);
  };

  const headers = [
    { id: 'codigo_Inventario', label: 'Codigo Inventario', align: 'center' },
    { id: 'producto', label: 'Producto', align: 'center' },
    { id: 'unidades_de_salida', label: 'Unidades de salida', align: 'center' },
    { id: 'unidades_de_stock', label: 'Unidades de stock', align: 'center' },
    { id: 'rotacion_de_inventario', label: 'Rotacion de inventarios', align: 'center' },
  ];

  return (
    <Container>
      <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Rotacion de inventarios</Typography>
        <FormControl fullWidth>
          <InputLabel id="codigo">Codigo Inventario</InputLabel>
          <Select
            labelId="codigo"
            name="codigo"
            label="Stock Inicial"
            onChange={(e) => getTableRotationByCode(e.target.value)}
          >
            {dataInventario.map((inventory, idx) => (
              <MenuItem key={idx} value={inventory.codigo}>
                {inventory.codigo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <DataTable searchParameter="product" headers={headers} items={tableRotation} />
    </Container>
  );
};

export default Rotacion_Inventario;
