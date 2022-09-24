// @ts-ignore
import { Language } from "$lib/Language";

// @ts-ignore
import { Host, getHost } from "$lib/Host";

export const prerender = false;
export const ssr = true;
export const csr = false;


// @ts-ignore
export async function load({ params, url }) {
    // Retrieve the selected organization based on:
    // 1. A URL query such as `?host=gentsestudentenraad.be`, for development purposes.
    // 2. The hostname contained in the request headers.
    const host: Host = getHost(url.searchParams.get('host') || url.hostname)

    // An optional language URL parameter which indicates which language to use.
    // Defaults to Dutch for obvious reasons.
    const language = params.language === "en" ? Language.ENGLISH : Language.DUTCH

    const routes = language === Language.DUTCH ? [
        ["Wie", "/wie"],
        ["Verkiezingen", "/"],
        ["Werking", "/"],
        ["Nieuws", "/nieuws"],
        ["FAQ", "/faq"],
        ["Contact", "/"],
      ] : [
        ["Who", "/en/wie"],
        ["Elections", "/en/"],
        ["Structure", "/en/"],
        ["News", "/en/nieuws"],
        ["FAQ", "/en/faq"],
        ["Contact", "/en/"],
    ];

	return {
		language,
        routes,
        host
	};
}
