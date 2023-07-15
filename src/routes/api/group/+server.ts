import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { RequestHandler } from "./$types";
import { Prisma } from "@prisma/client";

export const POST = (async ({ request }) => {
    const res: Prisma.PersonGroupCreateInput = await request.json();

    try {
        const group = await prisma.personGroup.create({
            data: res,
        });
        return json(group);
    } catch (err) {
        console.log(err);
        throw error(500);
    }
}) satisfies RequestHandler;
