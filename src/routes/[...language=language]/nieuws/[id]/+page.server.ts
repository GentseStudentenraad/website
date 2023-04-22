import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { prisma } from '$lib/Prisma';
import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = true;
export const csr = false;

export const load = (async ({ params, locals }) => {
	const news = await prisma.news.findMany({
		orderBy: [
			{
				published: 'desc'
			}
		],
		where: {
			organization: locals.configuration.organization,
			NOT: {
				id: parseInt(params.id)
			}
		}
	});

	const news_item = await prisma.news.findUniqueOrThrow({
		where: {
			id: parseInt(params.id)
		}
	});

	news_item.content = sanitizeHtml(marked.parse(news_item.content));

	return {
		news,
		news_item,
		configuration: locals.configuration
	};
}) satisfies PageServerLoad;
