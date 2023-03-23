import { prisma } from '$lib/Prisma';
import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params, locals }) => {
	const _ = params.language; // SVELTEKIT BUG, DO NOT REMOVE

	const faq = await prisma.questionCategory.findMany({
        include: {
            questions: true
        },
		where: {
			organization: locals.configuration.organization
		}
	});

	return {
		faq
	};
}) satisfies PageServerLoad;
