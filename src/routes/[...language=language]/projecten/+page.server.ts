import type { PageServerLoad } from './$types';
import { prisma } from '$lib/Prisma';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ params, locals }) => {
	const _ = params.language; // SVELTEKIT BUG, DO NOT REMOVE

	const projects = prisma.project.findMany({
        orderBy: {
            sort_index: 'asc',
        },
        where: {
            organization: locals.configuration.organization,
        }
    })

	return {
		projects,
	};
}) satisfies PageServerLoad;
