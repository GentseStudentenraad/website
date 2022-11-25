import {prisma} from '$lib/Prisma';
import type { PageLoad } from './$types';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load: PageLoad = async ({ params }) => {
	const _ = params.language; // SVELTEKIT BUG, DO NOT REMOVE

	const courses = await prisma.course.findMany({
		include: {
			subjects: {
				include: {
					subject: {
					},
				},
				orderBy: {
					subject: {
						name: 'asc',
					}
				}
			}
		},
		orderBy: {
			name: 'asc',
		}
	})

	return {
		courses
	};
}
