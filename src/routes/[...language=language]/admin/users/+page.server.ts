import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ locals }) => {
    const users = await prisma.user.findMany({
        orderBy: [
            {
                username: "asc",
            },
        ],
        include: {
            admin: {
                where: {
                    OR: [
                        { organization: locals.configuration.organization },
                        { organization: "COMMON" },
                    ],
                },
            },
        },
    });

    return {
        users,
    };
}) satisfies PageServerLoad;
