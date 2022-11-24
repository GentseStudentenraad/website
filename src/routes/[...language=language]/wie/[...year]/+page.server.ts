// @ts-ignore
import { Language } from '$lib/Language';

// @ts-ignore
import dutch from '$lib/i18n/nl.json';

// @ts-ignore
import english from '$lib/i18n/en.json';

// @ts-ignore
import { prisma } from '$lib/Prisma';

export const prerender = false;
export const ssr = true;
export const csr = true;

// @ts-ignore
export async function load({ params, url, locals }) {
	const _ = params.language; // SVELTEKIT BUG, DO NOT REMOVE

	const groups = await prisma.personGroup.findMany({
		orderBy: [{ sort_index: 'asc' }],
		include: {
			positions: {
				where: {
					organization: locals.organization,
					year: parseInt(params.year ? params.year : 2022)
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
			organization: locals.organization!
		}
	});

	return {
		groups: groups,
		translations: locals.language === Language.DUTCH ? dutch : english
	};
}
