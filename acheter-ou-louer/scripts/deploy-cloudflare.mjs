import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=JSON.parse(readFileSync('wrangler.json','utf8'));
if(root.name==='landing-acheteurs-a-configurer'||root.d1_databases?.[0]?.database_id==='00000000-0000-4000-8000-000000000000')throw new Error('Le nom du Worker et la base D1 doivent être configurés avant le déploiement.');
const site=readFileSync('lib/site.ts','utf8').match(/export const SITE_URL = '([^']+)';/)?.[1];
if(!site||new URL(site).hostname.endsWith('.invalid'))throw new Error('L’URL publique doit être configurée avant le déploiement.');
const built=JSON.parse(readFileSync('dist/server/wrangler.json','utf8'));
if(built.name!==root.name||built.d1_databases?.[0]?.database_id!==root.d1_databases?.[0]?.database_id)throw new Error('La compilation ne correspond pas à cette configuration. Relancez npm run build.');
const cli=fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js',import.meta.url));
for(const args of [['d1','migrations','apply','DB','--remote','--config','wrangler.json'],['deploy','--config','dist/server/wrangler.json']]){
  const result=spawnSync(process.execPath,[cli,...args],{stdio:'inherit'});
  if(result.error)throw result.error;
  if(result.status!==0)process.exit(result.status||1);
}
