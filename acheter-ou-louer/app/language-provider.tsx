'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { contentPath, languageTag, localeFromUrl, localizedPath, professionalHref, type Locale } from '@/lib/i18n';
import { english } from '@/lib/translations';
import { pageMetadata } from '@/lib/page-metadata';
import { SITE_URL } from '@/lib/site';

type LanguageContext = {
  locale: Locale;
  t: (source: string, values?: Record<string, string | number>) => string;
  money: (value: number) => string;
  number: (value: number, digits?: number) => string;
  localHref: (path: string) => string;
  siteHref: (path: string) => string;
  switchLanguage: () => void;
  switchHref: string;
};
const Context = createContext<LanguageContext | null>(null);

export default function LanguageProvider({ initialLocale, initialPath = '/', children }: { initialLocale: Locale; initialPath?: string; children: React.ReactNode }) {
  const [locale, setLocale] = useState(initialLocale);
  const [currentPath, setCurrentPath] = useState(initialPath);
  useEffect(() => {
    function sync() { setLocale(localeFromUrl(new URL(window.location.href))); setCurrentPath(window.location.pathname + window.location.search + window.location.hash); }
    sync(); window.addEventListener('popstate', sync); window.addEventListener('hashchange', sync);
    return () => { window.removeEventListener('popstate', sync); window.removeEventListener('hashchange', sync); };
  }, []);
  useEffect(() => {
    document.documentElement.lang = languageTag(locale);
    const path = contentPath(window.location.pathname);
    const meta = pageMetadata(path, locale);
    document.title = meta.title;
    const canonical = `${SITE_URL}${localizedPath(path, locale)}`;
    const attributes: [string, string][] = [['meta[name="description"]', meta.description], ['meta[property="og:title"]', meta.title], ['meta[property="og:description"]', meta.description], ['meta[property="og:locale"]', locale === 'en' ? 'en_CA' : 'fr_CA'], ['meta[property="og:locale:alternate"]', locale === 'en' ? 'fr_CA' : 'en_CA'], ['meta[property="og:url"]', canonical], ['meta[name="twitter:title"]', meta.title], ['meta[name="twitter:description"]', meta.description]];
    for (const [selector, value] of attributes) document.querySelector(selector)?.setAttribute('content', value);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
    const schemaElement = document.getElementById('landing-schema');
    if (schemaElement?.textContent) {
      const schema = JSON.parse(schemaElement.textContent) as Record<string, unknown>[];
      for (const entry of schema) {
        if (entry['@type'] === 'WebPage') Object.assign(entry, { name: meta.title, description: meta.description, inLanguage: languageTag(locale), url: canonical });
        if (entry['@type'] === 'RealEstateAgent') entry.url = `https://www.eric-fortier.com/${locale}`;
      }
      schemaElement.textContent = JSON.stringify(schema).replace(/</g, '\\u003c');
    }
  }, [locale]);
  const t = useCallback((source: string, values?: Record<string, string | number>) => {
    const key = source.trim();
    let translated = locale === 'en' && english[key] ? source.replace(key, () => english[key]) : source;
    if (values) translated = translated.replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match));
    return translated;
  }, [locale]);
  const switchLanguage = () => {
    const next = locale === 'fr' ? 'en' : 'fr';
    const path = localizedPath(window.location.pathname + window.location.search + window.location.hash, next);
    window.history.pushState(null, '', path);
    setCurrentPath(path); setLocale(next);
  };
  return <Context.Provider value={{ locale, t, switchLanguage, switchHref: localizedPath(currentPath, locale === 'fr' ? 'en' : 'fr'), localHref: path => localizedPath(path, locale), siteHref: path => professionalHref(path, locale), money: value => new Intl.NumberFormat(languageTag(locale), { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(value), number: (value, digits = 1) => value.toLocaleString(languageTag(locale), { maximumFractionDigits: digits }) }}>{children}</Context.Provider>;
}

export function useLanguage() {
  const context = useContext(Context);
  if (!context) throw new Error('LanguageProvider is required.');
  return context;
}
