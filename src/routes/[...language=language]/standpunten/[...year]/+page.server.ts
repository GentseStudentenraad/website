// @ts-ignore
import { Language } from '$lib/Language';

// @ts-ignore
import { Host, getHost } from '$lib/Host';

import { prisma } from '$lib/Prisma';
2;
// @ts-ignore
import dutch from '$lib/i18n/nl.json';

// @ts-ignore
import english from '$lib/i18n/en.json';
import { Organization } from '@prisma/client';

export const prerender = false;
export const ssr = true;
export const csr = true;

// @ts-ignore
export async function load({ params, url, locals }) {
	// An optional language URL parameter which indicates which language to use.
	// Defaults to Dutch for obvious reasons.
	const language = params.language === 'en' ? Language.ENGLISH : Language.DUTCH;

	// Results are filtered based on the academic year. If a parameter n is
	// given, we filter based on the academic year n-(n + 1). Otherwise we
	// simply decide which year to use based on the current date. For simplicity
	// we always use the first of september as the start of the new year. Note
	// that Date::getMonth uses a zero-based index, so September equals 8.
	let year: number | null = null;

	if (params.year) {
		try {
			year = parseInt(params.year);
		} catch {
			// todo: throw 404
		}
	} else {
		year = new Date().getFullYear();
		if (new Date().getMonth() < 8) {
			year -= 1;
		}
	}

	const opinionGroups = await prisma.opinionGroup.findMany({
		orderBy: {
			sort_index: 'asc'
		},
		include: {
			opinions: {
				where: {
					published_at: {
						lt: new Date(`${year! + 1}-09-01`),
						gt: new Date(`${year!}-08-31`)
					}
				},
				orderBy: {
					published_at: 'desc'
				}
			}
		},
		where: {
			organization: locals.organization
		}
	});

	return {
		language,
		organization: locals.organization,
		translations: language === Language.DUTCH ? dutch : english,
		opinionGroups
	};
}
