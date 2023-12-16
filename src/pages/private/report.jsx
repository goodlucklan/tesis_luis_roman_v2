import { useMemo } from 'react';

import { Stack, Container, Typography } from '@mui/material';

import useMovimientoApprove from 'src/hooks/use-kardex-data';

// import { movements } from 'src/_mock/movements';

import { DataTable } from 'src/components/table';

export default function ReportPage() {
  const { data } = useMovimientoApprove();
  const kardex = useMemo(() => data, [data]);
  const headers = [
    { id: 'product', label: 'Producto' },
    { id: 'movementType', label: 'Tipo de Movimiento', align: 'center' },
    { id: 'quantity', label: 'Cantidad', align: 'center' },
    { id: 'costo', label: 'Costo', align: 'center' },
    { id: 'reason', label: 'Motivo', align: 'center' },
    { id: 'category', label: 'Categoría', align: 'center' },
    { id: 'location', label: 'Locación', align: 'center' },
    { id: 'date', label: 'fecha', align: 'center' },
    { id: 'value', label: 'Valor total', align: 'center' },
  ];

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Kardex</Typography>
      </Stack>
      <DataTable searchParameter="product" headers={headers} items={kardex} />
    </Container>
  );
}
