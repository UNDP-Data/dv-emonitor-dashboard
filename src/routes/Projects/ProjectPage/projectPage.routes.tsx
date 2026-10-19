import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';

export default function createProjectPageRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/projects/$projectId',
    getParentRoute: () => parentRoute,
  }).lazy(() => import('./projectPage.lazy').then((d) => d.Route));
}
