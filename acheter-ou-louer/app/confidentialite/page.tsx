import { headers } from 'next/headers';
import { localeFrom } from '@/lib/i18n';
import { localizedMetadata } from '@/lib/page-metadata';
import Content from './content';
export async function generateMetadata() { return localizedMetadata('/confidentialite', localeFrom((await headers()).get('x-ef-locale'))); }
export default function Page() { return <Content />; }
