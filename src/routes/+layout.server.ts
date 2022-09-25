// @ts-ignore
import { Language } from "$lib/Language";

// @ts-ignore
import { Host, getHost } from "$lib/Host";

// @ts-ignore
import dutch from "$lib/i18n/nl.json";

// @ts-ignore
import english from "$lib/i18n/en.json"
import { prisma } from "$lib/Prisma";
import type { Configuration } from "@prisma/client";
import { error } from "@sveltejs/kit";

export const prerender = false;
export const ssr = true;
export const csr = false;


// @ts-ignore
export async function load({ params, url, locals }) {
    // An optional language URL parameter which indicates which language to use.
    // Defaults to Dutch for obvious reasons.
    const language = params.language === "en" ? Language.ENGLISH : Language.DUTCH

    // Retrieve the configuration of the website, and if missing, throw an error.
    const configuration = await prisma.configuration.findUnique({
        where: {
            organization: locals.organization
        }
    });

    if (configuration === null) {
        error(500, "An internal error occurred.")
    }

    // Create navigation bar routes. It's a bit messy but it's our only option.
    const routes = [];

    if (configuration?.who_section) {
        routes.push(Language.DUTCH ? ["Wie", "/wie"] : ["Who", "/en/wie"])
    }

    if (configuration?.news_section) {
        routes.push(Language.DUTCH ? ["Nieuws", "/nieuws"] : ["News", "/en/nieuws"])
    }

    if (configuration?.faq_section) {
        routes.push(Language.DUTCH ? ["FAQ", "/faq"] : ["FAQ", "/en/faq"])
    }

    if (configuration?.faq_section) {
        routes.push(Language.DUTCH ? ["Standpunten", "/standpunten"] : ["Opinions", "/en/standpunten"])
    }

    routes.push(Language.DUTCH ? ["Verkiezingen", "/verkiezingen"] : ["Elections", "/en/verkiezingen"])

    // Done! Pass to the view.
	return {
		language,
        routes,
        configuration,
        organization: locals.organization,
        translations: language === Language.DUTCH ? dutch : english,
	};
}
