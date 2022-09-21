// @ts-ignore
import { NewsItem } from "$lib/NewsItem";

export const prerender = false;
export const ssr = true;
export const csr = false;

export async function load() {
	return {
        news: NewsItem.getAll(20)
	};
}
