import {Language} from '$lib/Language';
import dutch from '$lib/i18n/nl.json';
import english from '$lib/i18n/en.json';
import {prisma} from '$lib/Prisma';
import type { LayoutServerLoad } from './$types';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ params, locals }) => {
	const _ = params.language; // SVELTEKIT BUG, DO NOT REMOVE

	// Create navigation bar routes. It's a bit messy but it's our only option.
	const routes = [];

	const configs = await prisma.configuration.findMany();

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
		routes.push(
			locals.language == Language.DUTCH
				? ['Standpunten', '/standpunten']
				: ['Opinions', '/en/standpunten']
		);
	}

	routes.push(
		locals.language == Language.DUTCH
			? ['Verkiezingen', '/verkiezingen']
			: ['Elections', '/en/verkiezingen']
	);

	if (locals.configuration.news_section) {
		routes.push(locals.language == Language.DUTCH ? ['Vakfeedback', '/feedback'] : ['Course Feedback', '/en/feedback']);
	}

	// Done! Pass to the view.
	return {
		language: locals.language,
		routes,
		configs: configs.filter((e) => e.id != locals.configuration.id),
		configuration: locals.configuration,
		organization: locals.organization,
		translations: locals.language === Language.DUTCH ? dutch : english
	};
}) satisfies LayoutServerLoad;
