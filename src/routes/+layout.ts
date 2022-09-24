// @ts-ignore
import { Language } from "$lib/Language";

// @ts-ignore
import { Host, getHost } from "$lib/Host";

// @ts-ignore
import dutch from "$lib/i18n/nl.json";

// @ts-ignore
import english from "$lib/i18n/en.json"

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
        ["Verkiezingen", "/verkiezingen"],
        ["Nieuws", "/nieuws"],
        ["FAQ", "/faq"],
      ] : [
        ["Who", "/en/wie"],
        ["Elections", "/en/verkiezingen"],
        ["News", "/en/nieuws"],
        ["FAQ", "/en/faq"],
    ];

	return {
		language,
        routes,
        host,
        translations: language === Language.DUTCH ? dutch : english,
	};
}
