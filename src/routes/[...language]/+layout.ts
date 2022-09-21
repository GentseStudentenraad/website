// @ts-ignore
import { Language } from "$lib/Language";

export const prerender = false;
export const ssr = true;
export const csr = false;


// @ts-ignore
export async function load({ params }) {
	const language = params.language === "en" ? Language.ENGLISH : Language.DUTCH

    const routes = language === Language.DUTCH ? [
        ["Wie", "/"],
        ["Verkiezingen", "/"],
        ["Werking", "/"],
        ["Nieuws", "/nieuws"],
        ["FAQ", "/"],
        ["Contact", "/"],
        ["Enlight", "/"],
      ] : [
        ["Who", "/"],
        ["Elections", "/"],
        ["Structure", "/"],
        ["News", "/nieuws"],
        ["FAQ", "/"],
        ["Contact", "/"],
        ["Enlight", "/"]
    ];

	return {
		language,
        routes
	};
}
