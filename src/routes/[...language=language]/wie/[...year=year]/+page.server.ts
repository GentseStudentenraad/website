import { Language } from '$lib/Language';
import dutch from '$lib/i18n/nl.json';
import english from '$lib/i18n/en.json';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/Prisma';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ params, locals }) => {
	const _ = params.language; // SVELTEKIT BUG, DO NOT REMOVE

	const groups = await prisma.personGroup.findMany({
		orderBy: [{ sort_index: 'asc' }],
		include: {
			positions: {
				where: {
					organization: locals.organization,
					year: parseInt(params.year ? params.year : '2022')
				},
				orderBy: {
					sort_index: 'asc'
				},
				include: {
					person: {}
				}
			}
		},
		where: {
			organization: locals.organization
		}
	});

	return {
		groups: groups,
		translations: locals.language === Language.DUTCH ? dutch : english
	};
}) satisfies PageServerLoad;
