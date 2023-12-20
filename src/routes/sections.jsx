import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

/* Public Pages */
export const LoginPage = lazy(() => import('src/pages/public/login'));

/* Private Pages */
export const IndexPage = lazy(() => import('src/pages/private/app'));
export const InputsAndOutputsPage = lazy(() => import('src/pages/private/inputs-and-outputs'));
export const ProductsPage = lazy(() => import('src/pages/private/products'));
export const ReportPage = lazy(() => import('src/pages/private/report'));
export const UsersPage = lazy(() => import('src/pages/private/users'));
export const InventoryAccuracy = lazy(() => import('src/pages/private/inventory-accuracy'));
export const Orders = lazy(() => import('src/pages/private/orders'));

export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'productos', element: <ProductsPage /> },
        { path: 'entradas-y-salidas', element: <InputsAndOutputsPage /> },
        { path: 'reporte', element: <ReportPage /> },
        { path: 'usuarios', element: <UsersPage /> },
        { path: 'exactitud', element: <InventoryAccuracy /> },
        { path: 'pedidos', element: <Orders /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
