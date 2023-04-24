import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";
export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params }) => {
    const group = await prisma.personGroup.findFirstOrThrow({
        where: {
            id: parseInt(params.id),
        },
    });

    return {
        group,
    };
}) satisfies PageServerLoad;
