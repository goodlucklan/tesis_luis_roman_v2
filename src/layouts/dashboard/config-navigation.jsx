import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Productos',
    path: '/productos',
    icon: icon('ic_cart'),
  },
  {
    title: 'Entradas y salidas',
    path: '/entradas-y-salidas',
    icon: icon('ic_product'),
  },
  {
    title: 'Movimientos',
    path: '/movimientos',
    icon: icon('ic_movement'),
  },
  {
    title: 'Reporte',
    path: '/reporte',
    icon: icon('ic_report'),
  },
  {
    title: 'Usuarios',
    path: '/usuarios',
    icon: icon('ic_user'),
  },
];

export default navConfig;
