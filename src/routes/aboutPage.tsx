import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1, P } from '@undp/design-system-react/Typography';
import { useTranslation } from 'react-i18next';

export function About() {
  const { t } = useTranslation();
  return (
    <div className='mx-auto my-8 w-full max-w-[1920px] px-4'>
      <H1 size='sm'>{t('about')}</H1>
      <Spacer size='2xl' />
      <P>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies mauris vitae enim
        mollis, ac vulputate dui pretium. Fusce laoreet sapien magna, vitae dignissim ante
        pellentesque non. Nam enim dui, hendrerit ut sem quis, facilisis euismod massa. Donec sit
        amet mauris eget eros ullamcorper eleifend ac nec augue. Fusce sapien elit, tincidunt sit
        amet leo vitae, maximus interdum felis. Vivamus et tempor erat, eget lacinia ante. Etiam vel
        pulvinar arcu. Mauris porta pretium nibh. Integer sollicitudin sapien ligula, quis blandit
        lectus maximus id. Pellentesque congue euismod lacinia. Nunc tempor massa non justo
        interdum, et blandit magna pharetra. Phasellus pharetra ligula varius justo ultrices
        accumsan. Sed laoreet, neque ullamcorper dignissim bibendum, lorem mi egestas enim, ut
        accumsan enim purus sed tellus. Nunc ornare velit sodales augue aliquam venenatis.
        <br />
        <br />
        Vivamus pellentesque, elit a pulvinar fringilla, lacus leo pellentesque nunc, sed tempor
        ante eros vel justo. Maecenas sodales euismod elit, quis elementum metus faucibus non. Fusce
        blandit maximus odio at dictum. Morbi tempor vel magna vel elementum. Sed sed velit
        scelerisque, pellentesque leo eu, egestas lectus. Vestibulum fermentum dolor vitae egestas
        consequat. Quisque a mauris convallis, lobortis nisl non, interdum odio. Quisque pulvinar
        imperdiet molestie. Pellentesque ac sem pulvinar ex ultrices rutrum ut sodales diam. Vivamus
        vel cursus lorem. Donec et lectus ipsum. Praesent diam velit, dapibus at placerat
        scelerisque, scelerisque ac augue. Nulla suscipit ut lacus condimentum porttitor.
        <br />
        <br />
        Pellentesque quis leo facilisis, pretium ipsum nec, rutrum orci. Fusce lectus diam, porta ac
        urna id, aliquet lacinia erat. Duis vehicula sodales quam, eget vulputate enim pharetra in.
        Nullam lobortis tincidunt mi, eu maximus nisi iaculis sed. Aenean et nunc sagittis, molestie
        enim quis, pellentesque magna. Morbi feugiat, metus at rutrum auctor, nulla ligula blandit
        est, vitae finibus eros diam a turpis.
        <br />
        <br />
        Vivamus pellentesque, elit a pulvinar fringilla, lacus leo pellentesque nunc, sed tempor
        ante eros vel justo. Maecenas sodales euismod elit, quis elementum metus faucibus non. Fusce
        blandit maximus odio at dictum. Morbi tempor vel magna vel elementum. Sed sed velit
        scelerisque, pellentesque leo eu, egestas lectus. Vestibulum fermentum dolor vitae egestas
        consequat. Quisque a mauris convallis, lobortis nisl non, interdum odio. Quisque pulvinar
        imperdiet molestie. Pellentesque ac sem pulvinar ex ultrices rutrum ut sodales diam. Vivamus
        vel cursus lorem. Donec et lectus ipsum. Praesent diam velit, dapibus at placerat
        scelerisque, scelerisque ac augue. Nulla suscipit ut lacus condimentum porttitor.
        <br />
        <br />
        Pellentesque quis leo facilisis, pretium ipsum nec, rutrum orci. Fusce lectus diam, porta ac
        urna id, aliquet lacinia erat. Duis vehicula sodales quam, eget vulputate enim pharetra in.
        Nullam lobortis tincidunt mi, eu maximus nisi iaculis sed. Aenean et nunc sagittis, molestie
        enim quis, pellentesque magna. Morbi feugiat, metus at rutrum auctor, nulla ligula blandit
        est, vitae finibus eros diam a turpis.
      </P>
    </div>
  );
}

export default function createAboutRoute(parentRoute: AnyRoute) {
  return createRoute({
    path: '/about',
    component: About,
    getParentRoute: () => parentRoute,
  });
}
