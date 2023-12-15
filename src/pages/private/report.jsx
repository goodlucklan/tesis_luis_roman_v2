import { Stack, Container, Typography } from '@mui/material';

import { movements } from 'src/_mock/movements';

import { DataTable } from 'src/components/table';

export default function ReportPage() {
  const headers = [
    { id: 'product', label: 'Producto' },
    { id: 'movementType', label: 'Tipo de Movimiento', align: 'center' },
    { id: 'quantity', label: 'Cantidad', align: 'center' },
    { id: 'reason', label: 'Motivo', align: 'center' },
    { id: 'category', label: 'Categoría', align: 'center' },
    { id: 'location', label: 'Locación', align: 'center' },
  ];

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Kardex</Typography>
      </Stack>
      <DataTable searchParameter="product" headers={headers} items={movements} />
    </Container>
  );
}
