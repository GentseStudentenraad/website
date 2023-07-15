import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { QuestionCategory } from "@prisma/client";
import type { RequestHandler } from "./$types";

export const PUT = (async ({ request, params }) => {
    const res: QuestionCategory = await request.json();

    try {
        const category = await prisma.questionCategory.update({
            data: res,
            where: {
                id: Number.parseInt(params.id),
            },
        });
        return json(category);
    } catch {
        throw error(500);
    }
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
    try {
        await prisma.questionCategory.delete({
            where: {
                id: Number.parseInt(params.id),
            },
        });
        return json({ message: "OK" });
    } catch (err) {
        console.error(err);
        throw error(500);
    }
}) satisfies RequestHandler;
