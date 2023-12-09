import { Stack, Container, Typography } from '@mui/material';

import { DataTable } from 'src/components/table';

export default function InputsAndOutputsPage() {
  const headers = [
    { id: 'product', label: 'Producto' },
    { id: 'movementType', label: 'Tipo de Movimiento', align: 'center' },
    { id: 'quantity', label: 'Cantidad', align: 'center' },
    { id: 'category', label: 'Categoría', align: 'center' },
    { id: 'date', label: 'Fecha', align: 'center' },
    { id: 'location', label: 'Locación', align: 'center' },
    { id: '' },
  ];

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Entradas y Salidas</Typography>
      </Stack>
      <DataTable headers={headers} items={[]} />
    </Container>
  );
}
