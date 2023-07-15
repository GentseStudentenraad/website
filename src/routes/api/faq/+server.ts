import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { Prisma } from "@prisma/client";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
    const res: Prisma.QuestionCreateInput = await request.json();

    try {
        const question = await prisma.question.create({
            data: res,
        });
        return json(question);
    } catch (err) {
        console.error(err);
        throw error(500);
    }
}) satisfies RequestHandler;
