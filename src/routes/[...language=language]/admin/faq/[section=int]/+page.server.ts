import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params, locals }) => {
    const category = await prisma.questionCategory.findUniqueOrThrow({
        where: {
            id: parseInt(params.section),
        },
    });

    const questions = await prisma.question.findMany({
        where: {
            organization: locals.configuration.organization,
            question_category_id: parseInt(params.section),
        },
    });

    return {
        category,
        categoryId: params.section,
        questions,
    };
}) satisfies PageServerLoad;
