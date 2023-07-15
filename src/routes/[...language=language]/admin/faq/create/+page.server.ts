import type { PageServerLoad } from "./$types";
import { Prisma } from "@prisma/client";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params, locals }) => {
    const category: Prisma.QuestionCategoryUncheckedCreateInput = {
        organization: locals.configuration.organization,
        slug: "",
        description: "",
        title: "",
        sort_index: 0,
    };

    return {
        category,
    };
}) satisfies PageServerLoad;
