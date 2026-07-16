import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { appRoutes } from './app/routes';

const container = document.getElementById('root');

if (container === null) {
  throw new Error('Root container "#root" not found');
}

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(appRoutes)} />
  </StrictMode>,
);
