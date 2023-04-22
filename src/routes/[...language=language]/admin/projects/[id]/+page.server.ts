import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params }) => {
    const project = await prisma.project.findUniqueOrThrow({
        where: {
            id: parseInt(params.id),
        },
    });

    return {
        project,
    };
}) satisfies PageServerLoad;
