import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createProjectsRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/projects',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./projects.lazy').then((d) => d.Route));
}
