import type { PageServerLoad } from './$types';
import { prisma } from '$lib/Prisma';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ locals }) => {
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
