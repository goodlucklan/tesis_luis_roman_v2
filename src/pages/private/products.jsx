import { products } from 'src/_mock/product';

import { DataTable } from 'src/components/table';

export default function ProductsPage() {
  const headers = [
    { id: 'name', label: 'Nombre' },
    { id: 'category', label: 'Categoría', align: 'center' },
    { id: 'unitCost', label: 'Costo Unitario', align: 'center' },
    { id: 'quantity', label: 'Cantidad', align: 'center' },
    { id: '' },
  ];

  const handleEdit = (payload) => {
    console.log('Edit: ', payload);
  };

  const handleDelete = (payload) => {
    console.log('Delete: ', payload);
  };

  return (
    <DataTable headers={headers} items={products} onEdit={handleEdit} onDelete={handleDelete} />
  );
}
