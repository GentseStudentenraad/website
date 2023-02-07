import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import {mdsvex} from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
            sass: true,
            pug: true,
		}),
		mdsvex({
            extensions: ['.md', '.svx'],
			layout: {
				markdown: './src/lib/layouts/MarkDown.svelte'
			}
        }),
	],

	extensions: ['.svelte', '.md', '.svx'],

	kit: {
		adapter: adapter()
	}
};

export default config;
