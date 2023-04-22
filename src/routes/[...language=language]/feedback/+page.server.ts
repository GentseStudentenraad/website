import { prisma } from '$lib/Prisma';
import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ params }) => {
	const courses = await prisma.course.findMany({
		include: {
			subjects: {
                include: {
                    subject: true,
                },
				orderBy: {
					subject: {
						name: 'asc'
					}
				}
			}
		},
		orderBy: {
			name: 'asc'
		}
	});

	return {
		courses
	};
}) satisfies PageServerLoad;
