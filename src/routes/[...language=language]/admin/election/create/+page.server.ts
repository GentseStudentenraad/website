import type { PageServerLoad } from "./$types";
import { Prisma } from "@prisma/client";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ locals }) => {
    const group: Prisma.ElectionGroupUncheckedCreateInput = {
        organization: locals.configuration.organization,
        sort_index: 0,
        description: "",
        name: "",
    };

    return {
        group,
    };
}) satisfies PageServerLoad;
