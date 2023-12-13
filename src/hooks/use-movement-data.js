import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';

import { db } from '../firebase/firebase';

const myMoves = collection(db, 'Movimiento');
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
        product: doc.producto,
        movementType: doc.Tipo_Movimiento,
        quantity: doc.cantidad,
        category: doc.categoria,
        date: doc.fecha,
        location: doc.locacion,
        status: doc.aprobacion,
      }));
      setData(filterlist);
    };
    obtenerMovimiento();
  }, []);
  return { data };
};
export default useMovimientoData;
