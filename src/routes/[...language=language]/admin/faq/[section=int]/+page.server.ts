import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params, locals }) => {
    const questions = await prisma.question.findMany({
        where: {
            organization: locals.configuration.organization,
            question_category_id: parseInt(params.section),
        },
    });

    return {
        categoryId: params.section,
        questions,
    };
}) satisfies PageServerLoad;
