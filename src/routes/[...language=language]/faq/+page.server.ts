import { Language } from '$lib/Language';
import dutch from '$lib/i18n/nl.json';
import english from '$lib/i18n/en.json';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

import { prisma } from '$lib/Prisma';

export const prerender = false;
export const ssr = true;
export const csr = true;

// @ts-ignore
export async function load({ params, url, locals }) {
	const _ = params.language; // SVELTEKIT BUG, DO NOT REMOVE

	const faq = await prisma.questionCategory.findMany({
		orderBy: {
			sort_index: 'asc'
		},
		include: {
			questions: {
				where: {
					organization: locals.organization
				},
				orderBy: {
					sort_index: 'asc'
				}
			}
		},
		where: {
			organization: locals.organization
		}
	});

	faq.forEach((category) => {
		category.questions.forEach((question) => {
			question.answer = sanitizeHtml(marked.parse(question.answer));
		});
	});

	return {
		configuration: locals.configuration,
		faq,
		translations: locals.language === Language.DUTCH ? dutch : english
	};
}
