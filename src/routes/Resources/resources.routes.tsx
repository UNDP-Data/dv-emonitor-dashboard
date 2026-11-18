import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { metaDataDefinition } from '@/utils/metaDataDefinition';

export default function createResourcesRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/resources',
    head: ({ params }) =>
      metaDataDefinition({
        path: '/resources',
        description: 'All resources under eMonitor+',
        locale: params.locale,
      }),
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./resources.lazy').then((d) => d.Route));
}
