export type Locale = 'fr' | 'en';
export const localeFrom = (value: string | null | undefined): Locale => value === 'en' ? 'en' : 'fr';
export const languageTag = (locale: Locale) => locale === 'en' ? 'en-CA' : 'fr-CA';

export function contentPath(path: string) {
  const withoutLanguage = path.replace(/^\/en(?=\/|$)/, '') || '/';
  return withoutLanguage === '/' ? '/' : withoutLanguage.replace(/\/+$/, '');
}

export function localeFromUrl(url: URL): Locale {
  return url.searchParams.get('lang') === 'en' || /^\/en(?:\/|$)/.test(url.pathname) ? 'en' : 'fr';
}

// Separate pre-rendered language paths work on GitHub Pages as well as Workers.
// Switching with history preserves the mounted calculator and form.
export function localizedPath(path: string, locale: Locale) {
  const url = new URL(path, 'https://landing.local');
  const base = contentPath(url.pathname);
  url.pathname = `${locale === 'en' ? '/en' : ''}${base === '/' ? '/' : `${base}/`}`;
  url.searchParams.delete('lang');
  return `${url.pathname}${url.search}${url.hash}`;
}

export function professionalHref(href: string, locale: Locale) {
  return locale === 'en' ? href.replace('www.eric-fortier.com/fr', 'www.eric-fortier.com/en') : href;
}
