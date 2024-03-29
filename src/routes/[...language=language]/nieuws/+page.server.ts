import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

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
    });

    return {
        news,
    };
}) satisfies PageServerLoad;
