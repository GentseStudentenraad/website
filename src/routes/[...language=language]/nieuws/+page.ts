// @ts-ignore
import { NewsItem } from "$lib/NewsItem";

// @ts-ignore
import { Language } from "$lib/Language";

export const prerender = false;
export const ssr = true;
export const csr = false;


// @ts-ignore
export async function load({ params }) {
	let language = params.language === "en" ? Language.ENGLISH : Language.DUTCH

	return {
        news: NewsItem.getAll(language = language, 20),
		language
	};
}
