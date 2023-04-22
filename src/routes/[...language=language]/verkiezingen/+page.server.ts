import { ElectionGroup } from '$lib/Election';
import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async () => {
	const electionGroups = ElectionGroup.getAll(5);

	return {
		electionGroups,
	};
}) satisfies PageServerLoad;
