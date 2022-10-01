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
	// Retrieve the selected organization based on:
	// 1. A URL query such as `?host=gentsestudentenraad.be`, for development purposes.
	// 2. The hostname contained in the request headers.
	const host: Host = getHost(url.searchParams.get('host') || url.hostname);

	// An optional language URL parameter which indicates which language to use.
	// Defaults to Dutch for obvious reasons.
	const language = params.language === 'en' ? Language.ENGLISH : Language.DUTCH;

	const calendar = CalendarItem.getAll(language, 100);
	const news = NewsItem.getAll(language, 4);

	// Retrieve the configuration of the website, and if missing, throw an error.
	const configuration = await prisma.configuration.findUnique({
		where: {
			organization: locals.organization
		}
	});

	if (configuration === null) {
		error(500, 'An internal error occurred.');
	}

	return {
		language,
		host,
		calendar,
		news,
		translations: language === Language.DUTCH ? dutch : english,
		configuration
	};
}
