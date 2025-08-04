import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex({ extension: '.svx' })],
	extensions: ['.svelte', '.svx', '.md'],
	kit: {
		adapter: adapter(),
		alias: {
			$assets: 'src/lib/assets',
			$ui: 'src/lib/components/ui',
			$components: 'src/lib/components',
			$c: 'src/lib/components',
			$stores: 'src/lib/stores',
			$s: 'src/lib/stores',
			$content: 'src/content',
			$utils: 'src/lib/utils',
			$u: 'src/lib/utils',
			$zod: 'src/lib/zod',
			$z: 'src/lib/zod',
			$debug: 'src/lib/components/debug'
		}
	}
};

export default config;
