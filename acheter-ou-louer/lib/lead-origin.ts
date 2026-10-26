import { SITE_URL } from './site';

export function allowedLeadOrigin(request: Request): string | null {
  const origin = request.headers.get('origin');
  if (!origin) return null;
  const url = new URL(request.url);
  if (origin === url.origin || origin === SITE_URL || origin === 'https://ericfortier86.github.io') return origin;
  // Separate localhost ports allow static-export QA without allowing them in production.
  if (['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) {
    try { if (['localhost', '127.0.0.1', '[::1]'].includes(new URL(origin).hostname)) return origin; } catch { /* Invalid origin. */ }
  }
  return null;
}

export function withLeadCors(response: Response, origin: string | null) {
  if (!origin) return response;
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', origin);
  const vary = headers.get('Vary');
  headers.set('Vary', vary ? `${vary}, Origin` : 'Origin');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
