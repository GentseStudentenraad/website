import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { Prisma } from "@prisma/client";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
    const res: Prisma.QuestionCategoryUncheckedCreateInput = await request.json();

    try {
        const category = await prisma.questionCategory.create({
            data: res,
        });
        return json(category);
    } catch (err) {
        console.error(err);
        throw error(500);
    }
}) satisfies RequestHandler;
