import { prisma } from '$lib/Prisma';

export const prerender = false;
export const ssr = false;
export const csr = true;

// @ts-ignore
export async function load({ params, url, locals }) {
	const _ = params.language; // SVELTEKIT BUG, DO NOT REMOVE

	const news_item = await prisma.news.findUnique({
		where: {
			id: parseInt(params.id)
		}
	});

	return {
		news_item,
	};
}
