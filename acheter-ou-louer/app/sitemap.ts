import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: SITE_URL, lastModified: '2026-10-23', changeFrequency: 'monthly', priority: 1 }, { url: `${SITE_URL}/guide-acheteur`, lastModified: '2026-10-23', changeFrequency: 'monthly', priority: .7 }, { url: `${SITE_URL}/confidentialite`, lastModified: '2026-10-23', priority: .2 }]; }
