import { Language } from '$lib/Language';
import { CalendarItem } from '$lib/CalendarItem';
import { prisma } from '$lib/Prisma';
import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ params, locals }) => {
    const _ = params.language;

	const news = await prisma.news.findMany({
		orderBy: [
			{
				published: 'desc'
			}
		],
		where: {
			organization: locals.configuration.organization
		},
		take: 4
	});

	return {
		calendar: CalendarItem.getAll(100),
		news,
	};
}) satisfies PageServerLoad;
