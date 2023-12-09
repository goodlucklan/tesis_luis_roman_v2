import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { db } from '../../../firebase/firebase';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------
const myProducts = collection(db, 'Productos');
const myMoves = collection(db, 'Movimiento');

export default function AppView() {
  const [sizeProducts, setSizeProducts] = useState(0);
  const [sizeMoves, setSizeMoves] = useState(0);

  useEffect(() => {
    Promise.all([getDocs(myProducts), getDocs(myMoves)])
      .then(([productsSnapshot, movesSnapshot]) => {
        setSizeProducts(productsSnapshot.size);
        setSizeMoves(movesSnapshot.size);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Productos totales"
            total={sizeProducts}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="New Users"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Movimientos"
            total={sizeMoves}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
