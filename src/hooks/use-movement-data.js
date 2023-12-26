import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';

import { db } from '../firebase/firebase';

const myMoves = collection(db, 'Movimiento_Nuevo');
const useMovimientoData = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const obtenerMovimiento = async () => {
      const movimientoSnapShot = await getDocs(myMoves);
      const movimientoData = movimientoSnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filterlist = movimientoData.map((doc) => ({
        id: doc.id,
        producto: doc.producto,
        codigo_inventario: doc.codigo,
        tipo_movimiento: doc.Tipo_Movimiento,
        cantidad: doc.cantidad,
        fecha: doc.fecha,
        locacion: doc.locacion,
        status: doc.aprobacion,
      }));
      setData(filterlist);
    };
    obtenerMovimiento();
  }, []);
  return { data };
};
export default useMovimientoData;
