import { P } from '@undp/design-system-react/Typography';
import { Button } from '@undp/design-system-react/Button';
import { useTranslation } from 'react-i18next';

import { useCounterActions, useCounter } from './stores/counter';

function App() {
  const count = useCounter();
  const { t } = useTranslation();
  const { increment, decrement } = useCounterActions();
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
        {t('started', { fileName: 'app.tsx' })}{' '}
        <span className='font-bold'>{t('count', { count: count })}</span>
      </P>
      <div className='mb-8 flex justify-center gap-4'>
        <Button
          variant='tertiary'
          onClick={() => {
            increment();
          }}
        >
          {t('increaseCount')}
        </Button>
        <Button
          variant='tertiary'
          onClick={() => {
            decrement();
          }}
        >
          {t('decreaseCount')}
        </Button>
      </div>
    </>
  );
}

export default App;
