// @ts-ignore
import { Language } from '$lib/Language';

// @ts-ignore
import { CalendarItem } from '$lib/CalendarItem';

import type { News } from '@prisma/client';

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

	const news = await prisma.news.findMany({
		orderBy: [
			{
				published: 'desc',
			}
		],
		where: {
			organization: locals.organization!,
		},
		take: 4,
	});

	return {
		calendar: CalendarItem.getAll(locals.language, 100),
		news,
		translations: locals.language === Language.DUTCH ? dutch : english,
		configuration: locals.configuration
	};
}
