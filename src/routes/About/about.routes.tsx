import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { metaDataDefinition } from '@/utils/metaDataDefinition';

export default function createAboutRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/about',
    head: ({ params }) =>
      metaDataDefinition({
        path: '/about',
        description: 'About eMonitor+',
        locale: params.locale,
      }),
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./about.lazy').then((d) => d.Route));
}
