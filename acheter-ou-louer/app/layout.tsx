import type { Metadata } from 'next';
import './globals.css';
import './brand-sections.css';
import './site-navigation.css';
import { SITE_URL } from '@/lib/site';
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Acheter ou louer en Outaouais? | Calculateur | Eric Fortier',
  description: 'Louer ou acheter à Gatineau? Comparez les scénarios, estimez votre pouvoir d’achat et préparez votre projet avec Eric Fortier, courtier immobilier RE/MAX en Outaouais.',
  authors: [{ name: 'Eric Fortier' }], alternates: { canonical: SITE_URL },
  openGraph: { title: 'Votre premier chez-vous commence par un plan.', description: 'Acheter ou louer? Un calculateur et un accompagnement pour votre projet en Outaouais.', locale: 'fr_CA', type: 'website', url: SITE_URL, siteName: 'Eric Fortier | RE/MAX Direct', images: [{ url: '/images/hero.png', width: 1600, height: 893, alt: 'Un intérieur lumineux, image du site professionnel d’Eric Fortier' }] },
  twitter: { card: 'summary_large_image' }, icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr-CA"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" /></head><body>{children}</body></html>;
}
