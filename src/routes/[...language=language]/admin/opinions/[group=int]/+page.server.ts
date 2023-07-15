import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params, locals }) => {
    const group = await prisma.opinionGroup.findUniqueOrThrow({
        where: {
            id: parseInt(params.group),
        },
    });

    const opinions = await prisma.opinion.findMany({
        where: {
            organization: locals.configuration.organization,
            opinion_group_id: group.id,
        },
    });

    return {
        group,
        opinions,
    };
}) satisfies PageServerLoad;
