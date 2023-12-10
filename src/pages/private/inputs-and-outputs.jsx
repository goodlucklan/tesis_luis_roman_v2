import { Stack, Container, Typography } from '@mui/material';

import { movements } from 'src/_mock/movements';

import { DataTable } from 'src/components/table';

export default function InputsAndOutputsPage() {
  const headers = [
    { id: 'product', label: 'Producto' },
    { id: 'movementType', label: 'Tipo de Movimiento', align: 'center' },
    { id: 'quantity', label: 'Cantidad', align: 'center' },
    { id: 'category', label: 'Categoría', align: 'center' },
    { id: 'date', label: 'Fecha', align: 'center' },
    { id: 'location', label: 'Locación', align: 'center' },
    { id: 'status', label: 'Estado', align: 'center' },
    { id: '' },
  ];

  const approveProduct = (product) => {
    console.log('approveProduct: ', product);
  };

  const deleteProduct = (product) => {
    console.log('deleteProduct: ', product);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Entradas y Salidas</Typography>
      </Stack>
      <DataTable
        searchParameter="product"
        headers={headers}
        items={movements}
        onApprove={approveProduct}
        onDelete={deleteProduct}
      />
    </Container>
  );
}
