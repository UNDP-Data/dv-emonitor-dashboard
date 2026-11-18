import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { metaDataDefinition } from '@/utils/metaDataDefinition';

export default function createProjectsRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/projects',
    head: () =>
      metaDataDefinition({
        path: '/projects',
        description: 'All projects under eMonitor+',
      }),
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./projects.lazy').then((d) => d.Route));
}
