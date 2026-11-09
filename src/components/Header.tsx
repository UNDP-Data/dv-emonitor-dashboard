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
  HeaderMenuDropdown,
  HeaderMenuLink,
  HeaderMenuUnit,
} from '@undp/design-system-react/Header';
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
          <HeaderMenuLink href={locale === DEFAULT_LANGUAGE ? '/' : `/${locale}`}>
            {t('home')}
          </HeaderMenuLink>
          <HeaderMenuDropdown
            label={t('projects')}
            items={projectCards.map((project) => ({
              label: project.title,
              href:
                locale === DEFAULT_LANGUAGE
                  ? `/projects/${project.id}`
                  : `/${locale}/projects/${project.id}`,
            }))}
          />
          <HeaderMenuLink
            href={locale === DEFAULT_LANGUAGE ? '/resources' : `/${locale}/resources`}
          >
            {t('resources')}
          </HeaderMenuLink>
          <HeaderMenuLink href={locale === DEFAULT_LANGUAGE ? '/about' : `/${locale}/about`}>
            {t('about')}
          </HeaderMenuLink>
        </HeaderMenuUnit>
        <HeaderActions>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex h-9 cursor-pointer items-center justify-between gap-2 whitespace-nowrap bg-transparent p-0 font-semibold text-secondary text-sm uppercase hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-muted-foreground dark:text-primary-white dark:hover:text-primary-white rtl:[direction:rtl] [&>span]:line-clamp-1 [&[data-state=open]>.chevron-down]:rotate-180'>
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
