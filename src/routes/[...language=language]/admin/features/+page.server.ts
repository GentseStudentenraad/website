import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ params, locals, url }) => {
	return {};
}) satisfies PageServerLoad;
