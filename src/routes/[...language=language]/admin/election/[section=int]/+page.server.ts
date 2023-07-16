import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params, locals }) => {
    const group = await prisma.electionGroup.findUniqueOrThrow({
        where: {
            id: parseInt(params.section),
        },
    });

    const elections = await prisma.election.findMany({
        where: {
            organization: locals.configuration.organization,
            election_group_id: parseInt(params.section),
        },
    });

    return {
        group,
        elections,
    };
}) satisfies PageServerLoad;
