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
export const csr = false;

// @ts-ignore
export async function load({ params }) {
	let language = params.language === 'en' ? Language.ENGLISH : Language.DUTCH;

	return {
		news: NewsItem.getAll((language = language), 20),
		language,
		translations: language === Language.DUTCH ? dutch : english
	};
}
