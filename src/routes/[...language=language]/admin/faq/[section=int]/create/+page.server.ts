import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/Prisma";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params }) => {
    const category = await prisma.questionCategory.findUniqueOrThrow({
        where: {
            id: parseInt(params.section),
        },
    });

    return {
        category,
    };
}) satisfies PageServerLoad;
