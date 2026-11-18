import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FooterEl from './components/Footer';
import HeaderEl from './components/Header';
import * as TanStackQueryProvider from './integration/tanstack-query';
import createAboutRoute from './routes/About/about.routes';
import createDefendersPageRoute from './routes/Projects/Defenders/defendersPage.routes';
import createProjectsRoute from './routes/Projects/projects.routes';
import createResourceRoute from './routes/Resources/resources.routes';

import './styles/fonts.css';
import './styles/style.css';

const rootRoute = createRootRoute({
  component: () => (
    <div className='flex min-h-screen flex-col gap-0'>
      <HeaderEl />
      <main className='flex grow flex-col justify-center'>
        <div className='flex flex-col justify-center'>
          <Outlet />
        </div>
      </main>
      <FooterEl />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  createAboutRoute(rootRoute),
  createResourceRoute(rootRoute),
  createProjectsRoute(rootRoute),
  createDefendersPageRoute(rootRoute),
]);

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <RouterProvider router={router} />
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  );
}
