import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { Prisma } from "@prisma/client";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
    const res: Prisma.OpinionGroupUncheckedCreateInput = await request.json();

    try {
        const group = await prisma.opinionGroup.create({
            data: res,
        });
        return json(group);
    } catch (err) {
        console.error(err);
        throw error(500);
    }
}) satisfies RequestHandler;
