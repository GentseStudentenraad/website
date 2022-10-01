// @ts-ignore
import { Language } from '$lib/Language';

// @ts-ignore
import { Host, getHost } from '$lib/Host';

// @ts-ignore
import { CalendarItem } from '$lib/CalendarItem';

// @ts-ignore
import { NewsItem } from '$lib/NewsItem';

// @ts-ignore
import dutch from '$lib/i18n/nl.json';

// @ts-ignore
import english from '$lib/i18n/en.json';
import { prisma } from '$lib/Prisma';
import { error } from '@sveltejs/kit';

export const prerender = false;
export const ssr = true;
export const csr = true;

// @ts-ignore
export async function load({ params, url, locals }) {
	const _ = params.language // SVELTEKIT BUG, DO NOT REMOVE

	return {
		calendar: CalendarItem.getAll(locals.language, 100),
		news: NewsItem.getAll(locals.language, 4),
		translations: locals.language === Language.DUTCH ? dutch : english,
		configuration: locals.configuration
	};
}
