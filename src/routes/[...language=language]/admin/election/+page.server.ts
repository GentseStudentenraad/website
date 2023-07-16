import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ locals }) => {
    const electionGroups = await prisma.electionGroup.findMany({
        where: {
            organization: locals.configuration.organization,
        },
    });

    return {
        electionGroups,
    };
}) satisfies PageServerLoad;
