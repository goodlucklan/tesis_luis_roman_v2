import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';

import { db } from '../firebase/firebase';

const myProducts = collection(db, 'Productos');
const useProductsData = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const obtenerProductos = async () => {
      const productosSnapShot = await getDocs(myProducts);
      const productosData = productosSnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filterList = productosData.map((doc) => ({
        id: doc.id,
        name: doc.nombre,
        category: doc.categoria,
        unitCost: doc.costo,
        description: doc.descripcion,
        quantity: doc.cantidad,
        talla: doc.talla,
        user: doc.usuario,
      }));
      setData(filterList);
    };
    obtenerProductos();
  }, []);
  return { data };
};
export default useProductsData;
