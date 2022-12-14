/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	return ['2022', '2021', '2020'].includes(param);
}
