import { prisma } from '$lib/Prisma';
import type { PageServerLoad } from './$types';
export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params }) => {
	const person = await prisma.person.findUniqueOrThrow({
		include: {
			positions: {
				include: {
					person_group: true
				}
			}
		},
		where: {
			id: parseInt(params.id)
		}
	});

	return {
		person
	};
}) satisfies PageServerLoad;
