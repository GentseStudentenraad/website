import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { RequestHandler } from "./$types";
import type { Election } from "@prisma/client";

export const PUT = (async ({ request, params }) => {
    const res: Election = await request.json();

    try {
        const result = await prisma.election.update({
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
        await prisma.election.delete({
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
