import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { Opinion } from "@prisma/client";
import type { RequestHandler } from "./$types";

export const PUT = (async ({ request, params }) => {
    const res: Opinion = await request.json();

    try {
        const result = await prisma.opinion.update({
            data: res,
            where: {
                id: Number.parseInt(params.id),
            },
        });

        return json(result);
    } catch {
        throw error(500);
    }
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
    try {
        await prisma.opinion.delete({
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
