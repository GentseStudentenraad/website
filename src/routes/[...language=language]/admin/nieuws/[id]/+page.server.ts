import { prisma } from '$lib/Prisma';
import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params }) => {
	const news_item = await prisma.news.findFirstOrThrow({
		where: {
			id: parseInt(params.id)
		}
	});

	return {
		news_item
	};
}) satisfies PageServerLoad;
