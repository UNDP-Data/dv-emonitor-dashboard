import type { AnyRoute } from '@tanstack/react-router';
import { createRoute, notFound } from '@tanstack/react-router';
import { metaDataDefinition } from '@/utils/metaDataDefinition';

export default function createDefendersPageRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/projects/$projectId',
    getParentRoute: () => parentRoute,
    head: ({ params }) =>
      metaDataDefinition({
        path: `/projects/${params.projectId}`,
        title: 'UNDP Defenders Project | eMonitor+',
        description:
          'Track and analyze online abuse, hate speech, and technology-facilitated gender-based violence (TFGBV) targeting women environmental human rights defenders (WEHRDs) and civil society leaders.',
        locale: params.locale,
      }),
    beforeLoad: ({ params }) => {
      if (params.projectId !== 'defenders') throw notFound();
    },
  }).lazy(() => import('./defendersPage.lazy').then((d) => d.Route));
}
