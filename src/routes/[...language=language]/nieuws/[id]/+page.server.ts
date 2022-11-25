import {marked} from 'marked';
import sanitizeHtml from 'sanitize-html';
import {prisma} from '$lib/Prisma';

export const prerender = false;
export const ssr = true;
export const csr = false;

// @ts-ignore
export async function load({ params, url, locals }) {
	const _ = params.language; // SVELTEKIT BUG, DO NOT REMOVE

	const news = await prisma.news.findMany({
		orderBy: [
			{
				published: 'desc'
			}
		],
		where: {
			organization: locals.organization!,
			NOT: {
				id: parseInt(params.id)
			}
		}
	});

	const news_item = await prisma.news.findUnique({
		where: {
			id: parseInt(params.id)
		}
	});
	news_item!.content = sanitizeHtml(marked.parse(news_item!.content));

	return {
		news,
		news_item,
		configuration: locals.configuration
	};
}
