import type { ParamMatcher } from "@sveltejs/kit";

export const match = ((param: string) => {
    const year = Number.parseInt(param);

    if (!Number.isInteger(year)) {
        return false;
    }

    return year >= 2000 && year <= new Date().getFullYear();
}) satisfies ParamMatcher;
