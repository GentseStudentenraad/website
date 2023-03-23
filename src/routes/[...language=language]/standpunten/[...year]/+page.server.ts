import { Language } from '$lib/Language';
import { prisma } from '$lib/Prisma';
import dutch from '$lib/i18n/nl.json';
import english from '$lib/i18n/en.json';
import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ params, locals }) => {
	const _ = params.language; // SVELTEKIT BUG, DO NOT REMOVE

	// Results are filtered based on the academic year. If a parameter n is
	// given, we filter based on the academic year n-(n + 1). Otherwise we
	// simply decide which year to use based on the current date. For simplicity
	// we always use the first of september as the start of the new year. Note
	// that Date::getMonth uses a zero-based index, so September equals 8.
	const year = parseInt(params.year);

	const opinionGroups = await prisma.opinionGroup.findMany({
		include: {
			opinions: {
				where: {
					published_at: {
						lt: new Date(`${year + 1}-09-01`),
						gt: new Date(`${year}-08-31`)
					}
				}
			}
		},
		where: {
			organization: locals.configuration.organization
		}
	});

	return {
		translations: locals.language === Language.DUTCH ? dutch : english,
		opinionGroups
	};
}) satisfies PageServerLoad;
