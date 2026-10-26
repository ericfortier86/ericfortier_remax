import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { localizedPath } from '@/lib/i18n';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/guide-acheteur', '/confidentialite'].flatMap(path => (['fr', 'en'] as const).map(locale => ({ url: `${SITE_URL}${localizedPath(path, locale)}`, lastModified: '2026-10-26', changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : path === '/guide-acheteur' ? .7 : .2, alternates: { languages: { 'fr-CA': `${SITE_URL}${path}`, 'en-CA': `${SITE_URL}${localizedPath(path, 'en')}` } } })));
}
