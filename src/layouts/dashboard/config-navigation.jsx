import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);
const icon2 = (name) => <SvgColor src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

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
  {
    title: 'exactitud del inventario',
    path: '/exactitud',
    icon: icon2('ic_accuaracy'),
  },
  {
    title: 'Pedidos',
    path: '/pedidos',
    icon: icon2('ic_notification_package'),
  },
  {
    title: 'Inventario',
    path: '/inventario',
    icon: icon2('ic_notification_shipping'),
  },
  {
    title: 'stock promedio',
    path: '/stock-media',
    icon: icon2('ic_flag_en'),
  },
  {
    title: 'Rotacion de Inventarios',
    path: '/rotacion-inventarios',
    icon: icon2('ic-rotation'),
  },
];

export default navConfig;
