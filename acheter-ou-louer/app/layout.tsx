import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import './brand-sections.css';
import './site-navigation.css';
import { SITE_URL } from '@/lib/site';
import { localeFrom, languageTag } from '@/lib/i18n';
import { localizedMetadata } from '@/lib/page-metadata';
import LanguageProvider from './language-provider';

export async function generateMetadata(): Promise<Metadata> {
  return { metadataBase: new URL(SITE_URL), ...localizedMetadata('/', localeFrom((await headers()).get('x-ef-locale'))), authors: [{ name: 'Eric Fortier' }], twitter: { card: 'summary_large_image' }, icons: { icon: '/favicon.svg' } };
}
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = localeFrom((await headers()).get('x-ef-locale'));
  return <html lang={languageTag(locale)}><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" /></head><body><LanguageProvider initialLocale={locale}>{children}</LanguageProvider></body></html>;
}
