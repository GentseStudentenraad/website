import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { Prisma } from "@prisma/client";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
    const res: Prisma.OpinionCreateInput = await request.json();

    try {
        const result = await prisma.opinion.create({
            data: res,
        });
        return json(result);
    } catch (err) {
        console.error(err);
        throw error(500);
    }
}) satisfies RequestHandler;
