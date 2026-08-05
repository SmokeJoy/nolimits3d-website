import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// `@atlas/ui`'s package entry (`packages/ui/src/index.ts`) is bundled by
// Vite's library build into `dist/index.js`, which does NOT itself import
// the compiled stylesheet -- Vite library mode emits CSS as a separate
// `dist/styles.css` asset and leaves consumers to opt in explicitly (hence
// the dedicated `"./styles.css"` package export). Without this import, every
// `@atlas/ui` component still renders (correct DOM, correct roles/hrefs) but
// with none of its intended styling -- confirmed by inspecting network
// requests in a real browser, where no request for the stylesheet was ever
// made before this line was added (M-003 Sprint 1, TSK-M003-WEB-D1).
import '@atlas/ui/styles.css';

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
