import { useState, useEffect } from 'react';
import { query, where, getDocs, collection } from 'firebase/firestore';

import { db } from '../firebase/firebase';

const movimientos = await query(
  collection(db, 'Movimiento'),
  where('aprobacion', '==', 'Aprobado')
);

const useMovimientoApprove = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const obtenerMovimientoconCostoAprobado = async () => {
      const movimientoSnapShot = await getDocs(movimientos);
      const result = [];
      movimientoSnapShot.docs.map(async (movDoc) => {
        const movementData = movDoc.data();
        console.log(movementData);
        const productoNombre = movementData.producto;
        const Products = await query(
          collection(db, 'Productos'),
          where('nombre', '==', productoNombre)
        );
        const productSnapShot = await getDocs(Products);
        if (!productSnapShot.empty) {
          const productoData = productSnapShot.docs[0].data();
          const { costo } = productoData;

          result.push({
            id: movDoc.id,
            product: movementData.producto,
            movementType: movementData.Tipo_Movimiento,
            quantity: movementData.cantidad,
            costo,
            reason: movementData.motivo,
            category: movementData.categoria,
            location: movementData.locacion,
            date: movementData.fecha,
            value: parseInt(movementData.cantidad, 10) * parseInt(costo, 10),
          });
          setData(result);
        }
      });
    };
    obtenerMovimientoconCostoAprobado();
  }, []);
  return { data };
};
export default useMovimientoApprove;
