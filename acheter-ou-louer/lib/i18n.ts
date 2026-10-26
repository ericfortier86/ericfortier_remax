export type Locale = 'fr' | 'en';
export const localeFrom = (value: string | null | undefined): Locale => value === 'en' ? 'en' : 'fr';
export const languageTag = (locale: Locale) => locale === 'en' ? 'en-CA' : 'fr-CA';

// Query-based language URLs let visitors switch without remounting the form.
export function localizedPath(path: string, locale: Locale) {
  const url = new URL(path, 'https://landing.local');
  if (locale === 'en') url.searchParams.set('lang', 'en');
  else url.searchParams.delete('lang');
  return `${url.pathname}${url.search}${url.hash}`;
}

export function professionalHref(href: string, locale: Locale) {
  return locale === 'en' ? href.replace('www.eric-fortier.com/fr', 'www.eric-fortier.com/en') : href;
}
