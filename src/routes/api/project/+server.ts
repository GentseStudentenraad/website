import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { Configuration, Prisma } from "@prisma/client";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
    const res: Prisma.ProjectCreateInput = await request.json();

    try {
        await prisma.project.create({
            data: res,
        });
        return json({ message: "OK" });
    } catch (err) {
        console.log(err);
        throw error(500);
    }
}) satisfies RequestHandler;
