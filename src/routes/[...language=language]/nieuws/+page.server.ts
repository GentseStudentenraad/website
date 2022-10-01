// @ts-ignore
import { NewsItem } from '$lib/NewsItem';

// @ts-ignore
import { Language } from '$lib/Language';

// @ts-ignore
import dutch from '$lib/i18n/nl.json';

// @ts-ignore
import english from '$lib/i18n/en.json';

export const prerender = false;
export const ssr = true;
export const csr = true;

// @ts-ignore
export async function load({ params, url, locals }) {
	const _ = params.language // SVELTEKIT BUG, DO NOT REMOVE

	return {
		news: NewsItem.getAll(locals.language, 20),
		translations: locals.language === Language.DUTCH ? dutch : english
	};
}
