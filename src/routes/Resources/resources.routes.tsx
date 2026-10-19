import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createResourcesRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/resources',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./resources.lazy').then((d) => d.Route));
}
