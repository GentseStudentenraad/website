import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { RequestHandler } from "./$types";
import { Prisma } from "@prisma/client";

export const POST = (async ({ request }) => {
    const res: Prisma.PageCreateInput = await request.json();

    try {
        await prisma.page.create({
            data: res,
        });
        return json({ message: "OK" });
    } catch {
        throw error(500);
    }
}) satisfies RequestHandler;
