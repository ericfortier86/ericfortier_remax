export const SITE_URL = 'https://louer-ou-acheter.eric-fortier.com';
export const WORKER_URL = 'https://ericfortier-remax.ericfortier86.workers.dev';
// Pages serves the public files; the Worker continues to store leads in D1.
export function leadApiUrl(path: string) {
  if (typeof window !== 'undefined' && ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)) {
    return `${window.location.origin}${path}`;
  }
  return `${WORKER_URL}${path}`;
}
export const CONTACT_EMAIL = 'eric.fortier@remax-quebec.com';
export const sectors = [
  { name: 'Gatineau', slug: 'gatineau' }, { name: 'Hull', slug: 'hull' },
  { name: 'Aylmer', slug: 'aylmer' }, { name: 'Cantley', slug: 'cantley' },
  { name: 'Val-des-Monts', slug: 'val-des-monts' }, { name: 'Buckingham', slug: 'buckingham' },
  { name: 'Chelsea', slug: 'chelsea' }, { name: 'Masson-Angers', slug: 'masson-angers' },
];
