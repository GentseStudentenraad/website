import { prisma } from '$lib/Prisma';
import type { PageServerLoad } from './$types';
import { calender } from '$lib/Calendar';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ params, locals, fetch }) => {
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
		calendar: (await calender).get(locals.configuration.organization),
		news
	};
}) satisfies PageServerLoad;
