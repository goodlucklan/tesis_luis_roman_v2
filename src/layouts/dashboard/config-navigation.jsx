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
    title: 'Reporte',
    path: '/reporte',
    icon: icon('ic_report'),
  },
  {
    title: 'Mapa',
    path: '/usuarios',
    icon: icon('ic_movement'),
  },
];

export default navConfig;
