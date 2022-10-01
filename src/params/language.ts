/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	return ['', 'en', 'nl'].includes(param);
}
