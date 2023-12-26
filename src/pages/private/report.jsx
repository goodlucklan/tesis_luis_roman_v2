import { useState, useEffect } from 'react';
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

import { db } from 'src/firebase/firebase';

import { DataTable } from 'src/components/table';

import useProductsData from '../../hooks/use-products-data';

export default function ReportPage() {
  const [productSelected, setProductSelected] = useState('');
  const [productFilter, setProductFilter] = useState();
  const [kardexTable, setKardexTable] = useState([]);
  const { data: dataSelectProducts } = useProductsData();

  useEffect(() => {
    const getMovements = async () => {
      const movimientos = await query(
        collection(db, 'Movimiento'),
        where('producto', '==', productSelected)
      );
      let saldo;
      const cantidad_inicial = productFilter[0].quantity;
      const movimientoSnapShot = await getDocs(movimientos);
      const kardexTableMap = movimientoSnapShot.docs.map((movDoc, index) => {
        const productData = movDoc.data();
        const cantidad = index > 0 ? saldo : cantidad_inicial;
        if (productData.Tipo_Movimiento === 'entrada') {
          saldo =
            parseInt(index > 0 ? cantidad : cantidad_inicial, 10) +
            parseInt(productData.cantidad, 10);
        } else {
          saldo =
            parseInt(index > 0 ? cantidad : cantidad_inicial, 10) -
            parseInt(productData.cantidad, 10);
        }

        return {
          id: movDoc.id,
          fecha: productData.fecha,
          producto: productData.producto,
          motivo: productData.motivo,
          usuario: 'Leslie Torres',
          cantidad,
          entrada: productData.Tipo_Movimiento === 'entrada' ? productData.cantidad : '0',
          salida: productData.Tipo_Movimiento === 'salida' ? productData.cantidad : '0',
          saldo,
        };
      });
      setKardexTable(kardexTableMap);
    };
    getMovements();
  }, [productSelected, productFilter]);

  const handleChange = (event) => {
    const filterProduct = dataSelectProducts.filter((x) => x.name === event.target.value);
    setProductFilter(filterProduct);
    setProductSelected(event.target.value);
  };

  const headers2 = [
    { id: 'fecha', label: 'Fecha' },
    { id: 'producto', label: 'Producto', align: 'center' },
    { id: 'motivo', label: 'Motivo', align: 'center' },
    { id: 'usuario', label: 'Usuario', align: 'center' },
    { id: 'cantidad', label: 'Cantidad Inicial', align: 'center' },
    { id: 'entrada', label: 'Entrada', align: 'center' },
    { id: 'salida', label: 'Salida', align: 'center' },
    { id: 'saldo', label: 'Saldo', align: 'center' },
  ];

  return (
    <Container>
      <Stack direction="column" alignItems="center" mb={5}>
        <Typography variant="h4" mb={6}>
          Kardex
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="category">Producto</InputLabel>
          <Select labelId="category" name="category" label="Categoría" onChange={handleChange}>
            {dataSelectProducts.map((category, idx) => (
              <MenuItem key={idx} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <DataTable searchParameter="product" headers={headers2} items={kardexTable} />
    </Container>
  );
}
