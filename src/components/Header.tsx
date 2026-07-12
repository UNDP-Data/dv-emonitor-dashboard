import { Link, useParams } from '@tanstack/react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@undp/design-system-react/DropdownMenu';
import {
  Header,
  HeaderActions,
  HeaderLogoUnit,
  HeaderMainNavUnit,
  HeaderMenuUnit,
} from '@undp/design-system-react/Header';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@undp/design-system-react/HoverCard';
import { P } from '@undp/design-system-react/Typography';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@/constants';
import { ChevronDown, LanguageSwitcherIcon } from '@/Icons';

export default function HeaderEl() {
  const params = useParams({ strict: false });
  const locale =
    params.locale && LANGUAGES.map((d) => d.id).includes(params.locale)
      ? params.locale
      : DEFAULT_LANGUAGE;
  const { t } = useTranslation();
  const projectCards = t('projectCards', { returnObjects: true }) as {
    title: string;
    id: string;
    text: string;
    image: string;
    url: string;
  }[];
  return (
    <Header>
      <HeaderLogoUnit
        hyperlink={locale === DEFAULT_LANGUAGE ? '/' : `/${locale}`}
        siteName='eMonitor +'
      />
      <HeaderMainNavUnit>
        <HeaderMenuUnit>
          <Link to='/{-$locale}'>{t('home')}</Link>
          <HoverCard openDelay={0} closeDelay={60}>
            <HoverCardTrigger>{t('projects')}</HoverCardTrigger>
            <HoverCardContent side='bottom' align='center' className='p-0'>
              <div className='flex flex-col px-0 py-2'>
                {projectCards.map((card) => (
                  <Link
                    to='/{-$locale}/projects/$projectId'
                    params={{ projectId: card.id }}
                    key={card.id}
                    className='w-full p-3 hover:bg-primary-gray-300 hover:text-primary-blue-600'
                  >
                    <P size='sm' marginBottom='none'>
                      {card.title}
                    </P>
                  </Link>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
          <Link to='/{-$locale}/resources'>{t('resources')}</Link>
          <Link to='/{-$locale}/about'>{t('about')}</Link>
        </HeaderMenuUnit>
        <HeaderActions>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex h-9 cursor-pointer items-center justify-between gap-2 whitespace-nowrap bg-transparent p-0 font-semibold text-primary-blue-600 text-sm uppercase hover:text-primary-blue-400 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground dark:text-primary-white dark:hover:text-primary-white rtl:[direction:rtl] [&>span]:line-clamp-1 [&[data-state=open]>.chevron-down]:rotate-180'>
                <LanguageSwitcherIcon />
                {LANGUAGES.find((d) => d.id === locale)?.label}
                <ChevronDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {LANGUAGES.map((d) => (
                <DropdownMenuItem key={d.id} asChild>
                  <Link
                    to='.'
                    params={{
                      ...params,
                      locale: d.id,
                    }}
                    preload={false}
                    className='w-full'
                  >
                    {d.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </HeaderActions>
      </HeaderMainNavUnit>
    </Header>
  );
}
