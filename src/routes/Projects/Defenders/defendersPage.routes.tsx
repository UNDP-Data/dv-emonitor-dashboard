import type { AnyRoute } from '@tanstack/react-router';
import { createRoute, notFound } from '@tanstack/react-router';

export default function createDefendersPageRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/projects/$projectId',
    getParentRoute: () => parentRoute,
    beforeLoad: ({ params }) => {
      if (params.projectId !== 'defenders') throw notFound();
    },
  }).lazy(() => import('./defendersPage.lazy').then((d) => d.Route));
}
