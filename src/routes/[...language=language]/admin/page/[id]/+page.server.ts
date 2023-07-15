import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params }) => {
    const page = await prisma.page.findFirstOrThrow({
        where: {
            id: parseInt(params.id),
        },
    });

    page.config = JSON.stringify(page.config);

    return {
        page,
    };
}) satisfies PageServerLoad;
