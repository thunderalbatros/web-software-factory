import { defineConfig } from 'astro/config';

export default defineConfig({
  site: '{{PROJECT_DOMAIN}}',
  output: 'static',
  build: {
    format: 'directory'
  }
});
