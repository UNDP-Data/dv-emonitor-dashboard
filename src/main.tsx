import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';

import * as TanStackQueryProvider from './integration/tanstack-query';
import HeaderEl from './components/Header';
import FooterEl from './components/Footer';
import App from './App';
import createTanStackQueryDemoRoute from './routes/queryDemo';
import i18n from './i18n';
import { DEFAULT_LANGUAGE, LANGUAGES } from './constants';

import './styles/fonts.css';
import './styles/style.css';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const localeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/{-$locale}',
  beforeLoad: async ({ params }) => {
    const locale =
      params.locale && LANGUAGES.map(d => d.id).includes(params.locale)
        ? params.locale
        : DEFAULT_LANGUAGE;

    await i18n.changeLanguage(locale);

    return { locale };
  },
  component: () => (
    <div className='flex flex-col gap-0 min-h-screen'>
      <HeaderEl />
      <main className='grow-1 flex flex-col justify-center'>
        <div className='flex flex-col justify-center'>
          <Outlet />
        </div>
      </main>
      <FooterEl />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => localeRoute,
  path: '/',
  component: App,
});

const routeTree = rootRoute.addChildren([
  localeRoute.addChildren([
    indexRoute,
    createTanStackQueryDemoRoute(localeRoute),
  ]),
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
      <I18nextProvider i18n={i18n}>
        <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
          <RouterProvider router={router} />
        </TanStackQueryProvider.Provider>
      </I18nextProvider>
    </StrictMode>,
  );
}