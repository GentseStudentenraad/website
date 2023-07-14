import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ locals }) => {
    const news = await prisma.news.findMany({
        orderBy: [
            {
                published_at: "desc",
            },
        ],
        where: {
            organization: locals.configuration.organization,
        },
        take: 4,
    });

    const calendars = await prisma.calendar.findMany({
        where: {
            organization: locals.configuration.organization,
        },
    });

    return {
        calendars,
        news,
    };
}) satisfies PageServerLoad;
