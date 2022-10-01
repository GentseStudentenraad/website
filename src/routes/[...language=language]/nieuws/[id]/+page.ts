import { Language } from '$lib/Language';
import { NewsItem } from '$lib/NewsItem';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export const prerender = false;
export const ssr = true;
export const csr = false;

// @ts-ignore
export async function load({ params }) {
	let language = params.language === 'en' ? Language.ENGLISH : Language.DUTCH;

	let news_item = NewsItem.getOne(language, 0);
	news_item.content = sanitizeHtml(marked.parse(news_item.content));

	let news = NewsItem.getAll(language, 4);

	return {
		news,
		news_item,
		language
	};
}
