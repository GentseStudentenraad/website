import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ locals }) => {
    const projects = await prisma.project.findMany({
        orderBy: [
            {
                sort_index: "desc",
            },
        ],
        where: {
            organization: locals.configuration.organization,
        },
    });

    return {
        projects,
    };
}) satisfies PageServerLoad;
