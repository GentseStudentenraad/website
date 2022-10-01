import { Language } from '$lib/Language';
import { NewsItem } from '$lib/NewsItem';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export const prerender = false;
export const ssr = true;
export const csr = false;

// @ts-ignore
export async function load({ params, url, locals }) {
	const _ = params.language // SVELTEKIT BUG, DO NOT REMOVE

	let news_item = NewsItem.getOne(locals.language, 0);
	news_item.content = sanitizeHtml(marked.parse(news_item.content));

	let news = NewsItem.getAll(locals.language, 4);

	return {
		news,
		news_item,
	};
}
