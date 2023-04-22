import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string) => {
	return ['', 'en', 'nl'].includes(param);
}) satisfies ParamMatcher;
