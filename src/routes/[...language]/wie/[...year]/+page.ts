// @ts-ignore
import { NewsItem } from "$lib/NewsItem";

// @ts-ignore
import { Language } from "$lib/Language";

// @ts-ignore
import { Group } from "$lib/Person";

export const prerender = false;
export const ssr = true;
export const csr = true;


// @ts-ignore
export async function load({ params }) {
	let language = params.language === "en" ? Language.ENGLISH : Language.DUTCH

	let groups: Array<Group> = Group.getAll();

	return {
        groups,
		language
	};
}
