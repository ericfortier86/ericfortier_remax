import vinext from 'vinext';
import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import { sites } from './scripts/vite/sites-vite-plugin';
import { configureToolEnvironment } from './scripts/tool-environment.mjs';

configureToolEnvironment(process.cwd());

export default defineConfig({
  plugins: [
    vinext(),
    sites({ mockAuth: false }),
    cloudflare({
      configPath: './wrangler.json',
      viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
      inspectorPort: false,
    }),
  ],
});
