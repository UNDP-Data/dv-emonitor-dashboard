import {
  Header,
  HeaderActions,
  HeaderLogoUnit,
  HeaderMainNavUnit,
  HeaderMenuUnit,
} from '@undp/design-system-react/Header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@undp/design-system-react/DropdownMenu';
import { Link, useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcherIcon, ChevronDown } from '@/Icons';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@/constants';

export default function HeaderEl() {
  const params = useParams({ strict: false });
  const locale =
    params.locale && LANGUAGES.map(d => d.id).includes(params.locale)
      ? params.locale
      : DEFAULT_LANGUAGE;
  const { t } = useTranslation();
  return (
    <Header>
      <HeaderLogoUnit
        hyperlink={locale === DEFAULT_LANGUAGE ? '/' : `/${locale}`}
        siteName='Site name'
        siteSubName='Sub-site name'
      />
      <HeaderMainNavUnit>
        <HeaderMenuUnit>
          <Link to='/{-$locale}'>{t('home')}</Link>
          <Link to='/{-$locale}/query-demo'>{t('query')}</Link>
        </HeaderMenuUnit>
        <HeaderActions>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex h-9 cursor-pointer items-center justify-between gap-2 whitespace-nowrap bg-transparent p-0 font-semibold text-primary-blue-600 text-sm uppercase hover:text-primary-blue-400 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground dark:text-primary-white dark:hover:text-primary-white rtl:[direction:rtl] [&>span]:line-clamp-1 [&[data-state=open]>.chevron-down]:rotate-180'>
                <LanguageSwitcherIcon />
                {LANGUAGES.find(d => d.id === locale)?.label}
                <ChevronDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {LANGUAGES.map(d => (
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
