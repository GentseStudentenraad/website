import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/Prisma";

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ locals }) => {
    const electionGroups = await prisma.electionGroup.findMany({
        include: {
            elections: {
                where: {
                    public: true,
                },
            },
        },
        where: {
            organization: locals.configuration.organization,
            elections: {
                some: {
                    public: true,
                },
            },
        },
    });

    return {
        electionGroups,
    };
}) satisfies PageServerLoad;
