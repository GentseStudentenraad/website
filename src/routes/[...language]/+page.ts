// @ts-ignore
import { Language } from "$lib/Language";

// @ts-ignore
import { Host, getHost } from "$lib/Host";

// @ts-ignore
import { CalendarItem } from "$lib/CalendarItem";

export const prerender = false;
export const ssr = true;
export const csr = true;


// @ts-ignore
export async function load({ params, url }) {
    // Retrieve the selected organization based on:
    // 1. A URL query such as `?host=gentsestudentenraad.be`, for development purposes.
    // 2. The hostname contained in the request headers.
    const host: Host = getHost(url.searchParams.get('host') || url.hostname)

    // An optional language URL parameter which indicates which language to use.
    // Defaults to Dutch for obvious reasons.
    const language = params.language === "en" ? Language.ENGLISH : Language.DUTCH

    const calendar = CalendarItem.getAll(language, 100);

	return {
		language,
        host,
        calendar,
	};
}
