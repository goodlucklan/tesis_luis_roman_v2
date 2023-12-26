import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';

import { db } from '../firebase/firebase';

const myorders = collection(db, 'pedidos');

const useOrdersData = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const ObtenerOrdenes = async () => {
      const orderSnapShot = await getDocs(myorders);
      const orderData = orderSnapShot.docs.map((doc) => {
        const orderCount = doc.data();
        return {
          id: doc.id,
          codigo: orderCount.codigo,
          producto: orderCount.producto,
          fecha: orderCount.fecha,
          cantidad_entregada: orderCount.cantidad_entregada,
          cantidad_solicitada: orderCount.cantidad_solicitada,
          tasa_llenado: orderCount.tasa_llenado,
        };
      });
      setData(orderData);
    };
    ObtenerOrdenes();
  }, []);
  return { data };
};
export default useOrdersData;
