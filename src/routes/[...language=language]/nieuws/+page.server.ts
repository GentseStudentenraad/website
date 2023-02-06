import { prisma } from '$lib/Prisma';
import { Language } from '$lib/Language';
import dutch from '$lib/i18n/nl.json';
import english from '$lib/i18n/en.json';
import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ params, locals }) => {
	const _ = params.language; // SVELTEKIT BUG, DO NOT REMOVE

	const news = await prisma.news.findMany({
		orderBy: [
			{
				published: 'desc'
			}
		],
		where: {
			organization: locals.configuration.organization
		}
	});

	return {
		news,
		translations: locals.language === Language.DUTCH ? dutch : english
	};
}) satisfies PageServerLoad;
