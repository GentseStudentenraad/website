import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params, locals }) => {
    const opinion = await prisma.opinion.findFirstOrThrow({
        where: {
            organization: locals.configuration.organization,
            id: parseInt(params.id),
        },
    });

    return {
        opinion,
    };
}) satisfies PageServerLoad;
