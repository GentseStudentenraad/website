import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params, locals }) => {
    const election = await prisma.election.findFirstOrThrow({
        where: {
            organization: locals.configuration.organization,
            election_group_id: parseInt(params.section),
            id: parseInt(params.id),
        },
    });

    return {
        election,
    };
}) satisfies PageServerLoad;
