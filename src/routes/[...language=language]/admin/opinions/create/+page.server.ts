import type { PageServerLoad } from "./$types";
import { Prisma } from "@prisma/client";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params, locals }) => {
    const group: Prisma.OpinionGroupUncheckedCreateInput = {
        organization: locals.configuration.organization,
        about: "",
        name: "",
        sort_index: 0,
    };

    return {
        group,
    };
}) satisfies PageServerLoad;
