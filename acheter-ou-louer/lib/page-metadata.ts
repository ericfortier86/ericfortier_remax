import type { Metadata } from 'next';
import { localizedPath, type Locale } from './i18n';
import { SITE_URL } from './site';

export function pageMetadata(path: string, locale: Locale) {
  const en = locale === 'en';
  if (path === '/confidentialite') return { title: en ? 'Privacy | Eric Fortier' : 'Confidentialité | Eric Fortier', description: en ? 'How Eric Fortier handles your information, buyer inquiries and cookie preferences.' : 'Comment Eric Fortier traite vos renseignements, vos demandes d’achat et vos préférences de témoins.' };
  if (path === '/guide-acheteur') return { title: en ? 'Outaouais home buying checklist | Eric Fortier' : 'Checklist pour acheter en Outaouais | Eric Fortier', description: en ? 'Prepare to buy a home in Gatineau and the Outaouais: budget, financing, criteria, documents and closing costs.' : 'Votre liste pour préparer un premier achat à Gatineau et en Outaouais : budget, financement, critères, documents et frais.' };
  return { title: en ? 'Buy or rent in the Outaouais? | Calculator | Eric Fortier' : 'Acheter ou louer en Outaouais? | Calculateur | Eric Fortier', description: en ? 'Rent or buy in Gatineau? Compare scenarios, estimate your buying power and plan your purchase with Eric Fortier, RE/MAX real estate broker in the Outaouais.' : 'Louer ou acheter à Gatineau? Comparez les scénarios, estimez votre pouvoir d’achat et préparez votre projet avec Eric Fortier, courtier immobilier RE/MAX en Outaouais.' };
}

export function localizedMetadata(path: string, locale: Locale): Metadata {
  const content = pageMetadata(path, locale);
  const url = `${SITE_URL}${localizedPath(path, locale)}`;
  return { ...content, alternates: { canonical: url, languages: { 'fr-CA': `${SITE_URL}${localizedPath(path, 'fr')}`, 'en-CA': `${SITE_URL}${localizedPath(path, 'en')}`, 'x-default': `${SITE_URL}${localizedPath(path, 'fr')}` } }, openGraph: { ...content, url, locale: locale === 'en' ? 'en_CA' : 'fr_CA', alternateLocale: locale === 'en' ? 'fr_CA' : 'en_CA', type: 'website', siteName: 'Eric Fortier | RE/MAX Direct', images: [{ url: '/images/hero.png', width: 1600, height: 893, alt: locale === 'en' ? 'A bright home interior' : 'Un intérieur lumineux' }] } };
}
