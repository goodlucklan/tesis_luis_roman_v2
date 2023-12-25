import * as XLSX from 'xlsx/xlsx.mjs';
import toast, { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { addDoc, getDocs, collection } from 'firebase/firestore';

import {
  Stack,
  Button,
  Dialog,
  Container,
  Typography,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import { excelToArray } from 'src/hooks/use-excel-data';

import Iconify from 'src/components/iconify';
import { DataTable } from 'src/components/table';
import { InventoryOpenForm } from 'src/components/form/inventory-open-form';

import { db } from '../../firebase/firebase';

const inventarioRef = collection(db, 'Inventario_Apertura');
const productosRef = collection(db, 'Productos_Nuevos');

const InventaryOpen = () => {
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [defaultData, setDefaultData] = useState({});
  const [excel, setExcel] = useState([]);
  const [data, setData] = useState([]);

  const clearDefaultData = () => {
    setDefaultData({
      codigo: '',
      fecha: '',
    });
  };

  const notify = (msg) => toast.success(msg);

  useEffect(() => {
    const obtenerInventario = async () => {
      const inventarioSnapShot = await getDocs(inventarioRef);
      const inventarioData = inventarioSnapShot.docs.map((doc) => {
        const productosInventarios = doc.data().productos;
        const costo_Conteo_documental = productosInventarios.reduce((acc, prod) => {
          const multiplicacion = parseInt(prod.costo, 10) * parseInt(prod.cantidad, 10);
          return acc + multiplicacion;
        }, 0);
        const costo_Conteo_fisico = productosInventarios.reduce((acc, prod) => {
          const multiplicacion = parseInt(prod.costo, 10) * parseInt(prod.cantidad_fisica, 10);
          return acc + multiplicacion;
        }, 0);
        return {
          id: doc.id,
          codigo: doc.data().codigo,
          usuario: 'Leslie Torres',
          fecha: doc.data().fecha,
          conteo_fisico: costo_Conteo_fisico || 0,
          conteo_documental: costo_Conteo_documental || 0,
        };
      });
      setData(inventarioData);
    };
    obtenerInventario();
  }, []);

  const headers = [
    { id: 'codigo', label: 'Codigo', align: 'center' },
    { id: 'usuario', label: 'Usuario', align: 'center' },
    { id: 'fecha', label: 'Fecha', align: 'center' },
    { id: 'conteo_fisico', label: 'Costo Inventario Fisico', align: 'center' },
    { id: 'conteo_documental', label: 'Costo Inventario Documental', align: 'center' },
  ];

  const getExcel = async () => {
    const inputArchivo = document.getElementById('excel');
    const archivo = inputArchivo.files[0];
    if (!archivo) {
      console.error('Selecciona un archivo Excel.');
    }
    const lector = new FileReader();
    lector.onload = await function readExcel(e) {
      const contenidoArrayBuffer = e.target.result;
      const workbook = XLSX.read(new Uint8Array(contenidoArrayBuffer), { type: 'array' });
      const arrayDeObjetos = excelToArray(workbook);
      setExcel(arrayDeObjetos);
    };
    lector.readAsArrayBuffer(archivo);
  };

  const handleSave = async (payload) => {
    await getExcel();
    const send = {
      codigo: payload.codigo,
      usuario: 'Leslie Torres',
      fecha: payload.fecha,
      conteo_fisico: '',
      conteo_documental: '',
      productos: excel[0],
    };
    await addDoc(inventarioRef, send);
    excel[0].map(async (value) => {
      await addDoc(productosRef, value);
    });
    setOpen(false);
    notify('Inventario Agregado Correctamente');
    setExcel([]);
  };
  return (
    <Container>
      <Toaster position="top-right" />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Inventario</Typography>
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
      <DataTable searchParameter="codigo" headers={headers} items={data} />
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Aperturar inventario</DialogTitle>
        <DialogContent>
          <InventoryOpenForm
            defaultData={defaultData}
            actionType={actionType}
            handleCancel={() => setOpen(false)}
            getExcel={getExcel}
            handleSave={handleSave}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default InventaryOpen;
