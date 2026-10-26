import Landing from './landing';
import { SITE_URL, sectors } from '@/lib/site';
export default function Home() {
  const schema = [{ '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: 'Eric Fortier — RE/MAX Direct', url: 'https://www.eric-fortier.com/fr', telephone: '+1-819-210-3124', email: 'eric.fortier@remax-quebec.com', image: `${SITE_URL}/images/eric-fortier.png`, address: { '@type': 'PostalAddress', streetAddress: '3 rue Picardie', addressLocality: 'Gatineau', addressRegion: 'QC', postalCode: 'J8T 1N8', addressCountry: 'CA' }, areaServed: sectors.map(s => ({ '@type': 'Place', name: s.name })) }, { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Acheter ou louer en Outaouais | Eric Fortier', url: SITE_URL, inLanguage: 'fr-CA', description: 'Comparez la location et l’achat, estimez votre capacité d’achat et préparez votre projet immobilier à Gatineau et en Outaouais.' }];
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><Landing /></>;
}
