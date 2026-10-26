import {readFileSync,writeFileSync} from 'node:fs';
const argumentsList=process.argv.slice(2);
const options={};
for(let i=0;i<argumentsList.length;i+=2){
  const key=argumentsList[i],value=argumentsList[i+1];
  if(!['--worker','--url','--database-id','--database-name'].includes(key)||!value||value.startsWith('--'))throw new Error('Usage : npm run configure:cloudflare -- --worker NOM --url https://ADRESSE.workers.dev --database-id UUID [--database-name NOM_BASE]');
  options[key]=value;
}
if(!/^[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/.test(options['--worker']||'')||options['--worker']==='landing-acheteurs-a-configurer')throw new Error('Indiquez le nom exact du Worker existant.');
const url=new URL(options['--url']||'https://example.invalid');
if(url.protocol!=='https:'||url.hostname.endsWith('.invalid')||url.username||url.password||url.search||url.hash||url.pathname!=='/')throw new Error('Indiquez l’origine HTTPS du Worker ou le domaine définitif, sans chemin.');
if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(options['--database-id']||'')||options['--database-id']==='00000000-0000-4000-8000-000000000000')throw new Error('Indiquez le vrai Database ID de la base D1.');
const config=JSON.parse(readFileSync('wrangler.json','utf8'));
config.name=options['--worker'];
config.d1_databases[0].database_id=options['--database-id'];
if(options['--database-name'])config.d1_databases[0].database_name=options['--database-name'];
writeFileSync('wrangler.json',JSON.stringify(config,null,2)+'\n');
const source=readFileSync('lib/site.ts','utf8').replace(/export const SITE_URL = '[^']*';/,`export const SITE_URL = '${url.origin}';`);
writeFileSync('lib/site.ts',source);
console.log('Configuration enregistrée pour '+config.name+' et '+url.origin+'. Lancez npm run build avant npm run deploy.');
