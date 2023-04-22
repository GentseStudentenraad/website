import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { prisma } from '$lib/Prisma';
import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ locals }) => {
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
	};
}) satisfies PageServerLoad;
