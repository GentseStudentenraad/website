import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { RequestHandler } from "./$types";
import { Prisma } from "@prisma/client";

export const POST = (async ({ request }) => {
    const res: Prisma.PersonUncheckedCreateInput = await request.json();

    try {
        const person = await prisma.person.create({
            data: res,
        });
        return json(person);
    } catch (err) {
        console.log(err);
        throw error(500);
    }
}) satisfies RequestHandler;
