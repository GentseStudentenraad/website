import { prisma } from '$lib/Prisma';
import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params, locals }) => {
	const _ = params.language; // SVELTEKIT BUG, DO NOT REMOVE

	const questions = await prisma.question.findMany({
		where: {
			organization: locals.configuration.organization,
			question_category_id: parseInt(params.id)
		}
	});

	return {
		questions
	};
}) satisfies PageServerLoad;
