import { NextResponse, type NextRequest } from 'next/server';
import { localeFrom } from './lib/i18n';

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set('x-ef-locale', localeFrom(request.nextUrl.searchParams.get('lang')));
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ['/', '/guide-acheteur', '/confidentialite'] };
