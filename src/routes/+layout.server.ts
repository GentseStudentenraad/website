// @ts-ignore
import { Language } from '$lib/Language';

// @ts-ignore
import dutch from '$lib/i18n/nl.json';

// @ts-ignore
import english from '$lib/i18n/en.json';

export const prerender = false;
export const ssr = true;
export const csr = true;

// @ts-ignore
export async function load({ params, url, locals }) {
	const _ = params.language // SVELTEKIT BUG, DO NOT REMOVE

	// Create navigation bar routes. It's a bit messy but it's our only option.
	const routes = [];

	if (locals.configuration.who_section) {
		routes.push(locals.language == Language.DUTCH ? ['Wie', '/wie'] : ['Who', '/en/wie']);
	}

	if (locals.configuration.news_section) {
		routes.push(locals.language == Language.DUTCH ? ['Nieuws', '/nieuws'] : ['News', '/en/nieuws']);
	}

	if (locals.configuration.faq_section) {
		routes.push(locals.language == Language.DUTCH ? ['FAQ', '/faq'] : ['FAQ', '/en/faq']);
	}

	if (locals.configuration.faq_section) {
		routes.push(locals.language == Language.DUTCH ? ['Standpunten', '/standpunten'] : ['Opinions', '/en/standpunten']);
	}

	routes.push(
		locals.language == Language.DUTCH ? ['Verkiezingen', '/verkiezingen'] : ['Elections', '/en/verkiezingen']
	);

	// Done! Pass to the view.
	return {
		language: locals.language,
		routes,
		configuration: locals.configuration,
		organization: locals.organization,
		translations: locals.language === Language.DUTCH ? dutch : english
	};
}
