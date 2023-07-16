import type { PageServerLoad } from "./$types";
import { Prisma } from "@prisma/client";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params, locals }) => {
    const election: Prisma.ElectionUncheckedCreateInput = {
        organization: locals.configuration.organization,
        sort_index: 0,
        title: "",
        description: "",
        document: "",
        public: false,
        election_group_id: Number.parseInt(params.section),
    };

    return {
        election,
    };
}) satisfies PageServerLoad;
