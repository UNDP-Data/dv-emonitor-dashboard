import { DEFAULT_LANGUAGE } from '@/constants';

const SITE_URL = 'SITE_URL';
const SITE_NAME = 'eMonitor+';
const DEFAULT_DESC =
  'AI-powered technology to promote access to reliable information and reduce the impact of harmful content';

const OG_LOCALES: Record<string, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  es: 'es_ES',
};

interface Arg {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  locale?: string;
}

export function metaDataDefinition({
  title,
  description = DEFAULT_DESC,
  path = '/',
  image = `${SITE_URL}/imgs/og-image.jpg`,
  imageAlt = SITE_NAME,
  imageHeight = 483,
  imageWidth = 862,
  locale,
}: Arg = {}) {
  const localeLanguage = OG_LOCALES[locale || DEFAULT_LANGUAGE];
  const url =
    !locale || locale === DEFAULT_LANGUAGE ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`;
  return {
    meta: [
      { title: title ?? SITE_NAME },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: title ?? SITE_NAME },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: `${imageWidth}` },
      { property: 'og:image:height', content: `${imageHeight}` },
      { property: 'og:image:alt', content: imageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { httpEquiv: 'content-language', content: locale },
      { property: 'og:locale', content: localeLanguage },
    ],
    links: [
      { rel: 'canonical', href: url },
      ...Object.keys(OG_LOCALES).map((l) => ({
        rel: 'alternate',
        hrefLang: l,
        href: `${SITE_URL}/${l}${path}`,
      })),
      {
        rel: 'alternate',
        hrefLang: 'x-default',
        href: `${SITE_URL}/${DEFAULT_LANGUAGE}${path}`,
      },
    ],
  };
}
