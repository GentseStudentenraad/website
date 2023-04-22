import type { ParamMatcher } from "@sveltejs/kit";

export const match = ((param: string) => {
    return ["2022", "2021", "2020"].includes(param);
}) satisfies ParamMatcher;
