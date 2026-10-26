import Landing from './landing';
import { SITE_URL, sectors } from '@/lib/site';
import { headers } from 'next/headers';
import { languageTag, localeFrom, localizedPath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/page-metadata';
export default async function Home() {
  const locale = localeFrom((await headers()).get('x-ef-locale'));
  const metadata = pageMetadata('/', locale);
  const schema = [{ '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: 'Eric Fortier — RE/MAX Direct', url: `https://www.eric-fortier.com/${locale}`, telephone: '+1-819-210-3124', email: 'eric.fortier@remax-quebec.com', image: `${SITE_URL}/images/eric-fortier.png`, address: { '@type': 'PostalAddress', streetAddress: '3 rue Picardie', addressLocality: 'Gatineau', addressRegion: 'QC', postalCode: 'J8T 1N8', addressCountry: 'CA' }, areaServed: sectors.map(s => ({ '@type': 'Place', name: s.name })) }, { '@context': 'https://schema.org', '@type': 'WebPage', name: metadata.title, url: `${SITE_URL}${localizedPath('/', locale)}`, inLanguage: languageTag(locale), description: metadata.description }];
  return <><script id="landing-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><Landing /></>;
}
