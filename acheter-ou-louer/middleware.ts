import { NextResponse, type NextRequest } from 'next/server';
import { contentPath, localeFromUrl } from './lib/i18n';

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set('x-ef-locale', localeFromUrl(new URL(request.url)));
  headers.set('x-ef-path', request.nextUrl.pathname + request.nextUrl.search);
  const base = contentPath(request.nextUrl.pathname);
  if (base !== request.nextUrl.pathname && ['/', '/guide-acheteur', '/confidentialite'].includes(base)) {
    const target = new URL(request.url);
    target.pathname = base;
    return NextResponse.rewrite(target, { request: { headers } });
  }
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ['/', '/guide-acheteur/:path*', '/confidentialite/:path*', '/en/:path*'] };
