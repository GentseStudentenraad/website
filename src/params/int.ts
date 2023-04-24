import type { ParamMatcher } from "@sveltejs/kit";

export const match = ((param: string) => {
    return Number.isInteger(Number.parseInt(param));
}) satisfies ParamMatcher;
