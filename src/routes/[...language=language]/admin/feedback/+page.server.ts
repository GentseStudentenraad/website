import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params }) => {
	const _ = params.language; // SVELTEKIT BUG, DO NOT REMOVE

	return {};
}) satisfies PageServerLoad;
