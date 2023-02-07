import { Language } from '$lib/Language';
import dutch from '$lib/i18n/nl.json';
import english from '$lib/i18n/en.json';
import { prisma } from '$lib/Prisma';
import { Organization, Markup } from '@prisma/client';
import type { LayoutServerLoad } from './$types';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ params, locals }) => {
    const _ = params.language;

	// Create navigation bar routes. It's a bit messy but it's our only option.
	const routes = [];

	const configs = await prisma.configuration.findMany();

	if (locals.configuration.who_section) {
		routes.push(locals.language == Language.DUTCH ? ['Wie', '/nl/wie'] : ['Who', '/en/wie']);
	}

	if (locals.configuration.news_section) {
		routes.push(locals.language == Language.DUTCH ? ['Nieuws', '/nl/nieuws'] : ['News', '/en/nieuws']);
	}

	if (locals.configuration.faq_section) {
		routes.push(locals.language == Language.DUTCH ? ['FAQ', '/nl/faq'] : ['FAQ', '/en/faq']);
	}

	if (locals.configuration.faq_section) {
		routes.push(
			locals.language == Language.DUTCH
				? ['Standpunten', '/nl/standpunten']
				: ['Opinions', '/en/standpunten']
		);
	}

	routes.push(
		locals.language == Language.DUTCH
			? ['Verkiezingen', '/nl/verkiezingen']
			: ['Elections', '/en/verkiezingen']
	);

	if (locals.configuration.news_section) {
		routes.push(
			locals.language == Language.DUTCH
				? ['Vakfeedback', '/nl/feedback']
				: ['Course Feedback', '/en/feedback']
		);
	}

    const i18n = await prisma.i18n.findMany({
        select: {
            key: true,
            dutch: locals.language == Language.DUTCH,
            english: locals.language == Language.ENGLISH,
			markup: true
        },
        where: {
            OR: [
                { organization: locals.configuration.organization},
                { organization: Organization.COMMON},
            ]
        }
    });

    const translations = new Map();
    i18n.forEach(e => {
        const raw = locals.language == Language.DUTCH ? e.dutch : e.english;
        if (raw) {
			if (e.markup == Markup.MARKDOWN) {
           	 	const value = (marked.parse(raw));
				translations.set(e.key, value)
			} else {
				const value = sanitizeHtml(raw);
				translations.set(e.key, value)
			}
        }
    });

	// Done! Pass to the view.
	return {
		language: locals.language,
		routes,
		configs: configs.filter((e) => e.id != locals.configuration.id),
		configuration: locals.configuration,
		translations: locals.language === Language.DUTCH ? dutch : english,
        i18n: translations,
	};
}) satisfies LayoutServerLoad;
