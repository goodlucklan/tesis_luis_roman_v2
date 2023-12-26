import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';

import {
  Stack,
  Select,
  Button,
  MenuItem,
  Container,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import { DataTable } from 'src/components/table';

import { db } from '../../firebase/firebase';

const inventarioRef = collection(db, 'Inventario_Apertura');

const Stock_promedio = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    stock_inicial: '',
    stock_final: '',
  });
  const [tableRotation, setTableRotation] = useState([]);
  useEffect(() => {
    const obtenerInventario = async () => {
      const inventarioSnapShot = await getDocs(inventarioRef);
      const inventarioData = inventarioSnapShot.docs.map((doc) => ({
        id: doc.id,
        codigo: doc.data().codigo,
        fecha: doc.data().fecha,
        productos: doc.data().productos,
      }));
      setData(inventarioData);
    };
    obtenerInventario();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const search = () => {
    const getOnlyProductsInitial = data.filter((code) => code.codigo === formData.stock_inicial);
    const getOnlyProductosFinal = data.filter((code) => code.codigo === formData.stock_final);
    const combinacion = getOnlyProductsInitial[0].productos.map((product1, index) => {
      const product2 = getOnlyProductosFinal[0].productos[index];
      return {
        id: index + 1,
        producto: product1.nombre,
        stock_inicial: product1.cantidad,
        stock_final: product2.cantidad,
        stock_promedio: (parseInt(product1.cantidad, 10) + parseInt(product2.cantidad, 10)) / 2,
      };
    });
    setTableRotation(combinacion);
  };

  const headers = [
    { id: 'producto', label: 'Producto', align: 'center' },
    { id: 'stock_inicial', label: 'Stock Inicial', align: 'center' },
    { id: 'stock_final', label: 'Stock Final', align: 'center' },
    { id: 'stock_promedio', label: 'Stock Promedio', align: 'center' },
  ];

  return (
    <Container>
      <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Stock Promedio</Typography>
        <FormControl fullWidth>
          <InputLabel id="codigo">Stock Inicial</InputLabel>
          <Select
            labelId="codigo"
            name="stock_inicial"
            label="Stock Inicial"
            onChange={handleChange}
          >
            {data.map((category, idx) => (
              <MenuItem key={idx} value={category.codigo}>
                {category.codigo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          sx={{
            marginTop: 2,
          }}
        >
          <InputLabel id="stock_final">Stock Final</InputLabel>
          <Select
            labelId="stock_final"
            name="stock_final"
            label="Stock Final"
            onChange={handleChange}
          >
            {data.map((category, idx) => (
              <MenuItem key={idx} value={category.codigo}>
                {category.codigo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          sx={{
            marginTop: 2,
          }}
          fullWidth
          onClick={search}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Buscar
        </Button>
      </Stack>
      <DataTable searchParameter="product" headers={headers} items={tableRotation} />
    </Container>
  );
};

export default Stock_promedio;
