import type { PageServerLoad } from "./$types";
import { Prisma } from "@prisma/client";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ locals }) => {
    const page: Prisma.PageUncheckedCreateInput = {
        organization: locals.configuration.organization,
        config: "{}",
        slug: "",
        markup: "MARKDOWN",
        content_dutch: "",
        content_english: "",
        nav_name_dutch: "",
        nav_name_english: "",
    };

    return {
        page,
    };
}) satisfies PageServerLoad;
