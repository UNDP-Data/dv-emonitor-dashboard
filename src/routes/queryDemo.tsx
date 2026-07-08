import { createRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import type { AnyRoute } from '@tanstack/react-router';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import { useTranslation } from 'react-i18next';

function useTodoData() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      Promise.resolve([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ]),
  });
}

export function TanStackQueryDemo() {
  const { data, isLoading, isError } = useTodoData();
  const { t } = useTranslation();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;

  if (isError) return <>Error</>;
  return (
    <>
      <div className='mx-auto my-8 flex items-center justify-center gap-4'>
        <img
          src='/imgs/Vitejs-logo.svg'
          alt='vite logo'
          width='72px'
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        />
        <P marginBottom='none'>&</P>
        <img
          src='/imgs/Tailwind_CSS_Logo.svg'
          alt='tailwind logo'
          width='72px'
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        />
        <P marginBottom='none'>&</P>
        <img
          src='/imgs/Tanstack-logo.png'
          alt='tanstack logo'
          width='72px'
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        />
        <P marginBottom='none'>&</P>
        <img
          src='/imgs/Zustand-logo.svg'
          alt='Zustand logo'
          width='72px'
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        />
        <P marginBottom='none'>&</P>
        <img
          src='/imgs/undp-logo-blue.svg'
          alt='UNDP logo'
          width='72px'
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        />
      </div>
      <P marginBottom='xl' className='text-center'>
        {t('dataLoading', { count: data?.length })}
      </P>
    </>
  );
}

export default function createTanStackQueryDemoRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/query-demo',
    component: TanStackQueryDemo,
    getParentRoute: () => parentRoute,
  });
}
