import { prisma } from "$lib/Prisma";
import type { LayoutServerLoad } from "./$types";

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ locals }) => {
    const groupCount = prisma.personGroup.count({
        where: {
            organization: locals.configuration.organization,
        },
    });

    const personCount = prisma.person.count({
        where: {
            organization: locals.configuration.organization,
        },
    });

    return {
        groupCount,
        personCount,
    };
}) satisfies LayoutServerLoad;
