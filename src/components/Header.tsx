import { useParams } from '@tanstack/react-router';
import {
  Header,
  HeaderLogoUnit,
  HeaderMainNavUnit,
  HeaderMenuDropdown,
  HeaderMenuLink,
  HeaderMenuUnit,
} from '@undp/design-system-react/Header';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@/constants';

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
      </HeaderMainNavUnit>
    </Header>
  );
}
