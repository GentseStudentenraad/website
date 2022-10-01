// @ts-ignore
import { Language } from '$lib/Language';

// @ts-ignore
import { Host, getHost } from '$lib/Host';

// @ts-ignore
import { ElectionGroup } from '$lib/Election';

// @ts-ignore
import dutch from '$lib/i18n/nl.json';

// @ts-ignore
import english from '$lib/i18n/en.json';

export const prerender = false;
export const ssr = true;
export const csr = true;

// @ts-ignore
export async function load({ params, url }) {
	// Retrieve the selected organization based on:
	// 1. A URL query such as `?host=gentsestudentenraad.be`, for development purposes.
	// 2. The hostname contained in the request headers.
	const host: Host = getHost(url.searchParams.get('host') || url.hostname);

	// An optional language URL parameter which indicates which language to use.
	// Defaults to Dutch for obvious reasons.
	const language = params.language === 'en' ? Language.ENGLISH : Language.DUTCH;

	const electionGroups = ElectionGroup.getAll(5);

	return {
		language,
		host,
		electionGroups,
		translations: language === Language.DUTCH ? dutch : english
	};
}
