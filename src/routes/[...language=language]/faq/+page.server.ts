import { Language } from '$lib/Language';
import dutch from '$lib/i18n/nl.json';
import english from '$lib/i18n/en.json';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { prisma } from '$lib/Prisma';
import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ params, locals }) => {
	const _ = params.language; // SVELTEKIT BUG, DO NOT REMOVE

	const faq = await prisma.questionCategory.findMany({
		include: {
			questions: {
				where: {
					organization: locals.configuration.organization
				}
			}
		},
		where: {
			organization: locals.configuration.organization
		}
	});

	faq.forEach((category) => {
		category.questions.forEach((question) => {
			question.answer = sanitizeHtml(marked.parse(question.answer));
		});
	});

	return {
		faq,
		translations: locals.language === Language.DUTCH ? dutch : english
	};
}) satisfies PageServerLoad;
