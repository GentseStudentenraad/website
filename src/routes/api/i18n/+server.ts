import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { RequestHandler } from "./$types";
import { Prisma } from "@prisma/client";

export const POST = (async ({ request, params }) => {
    const res: Prisma.i18nCreateInput = await request.json();

    try {
        await prisma.i18n.create({
            data: res,
        });
        return json({ message: "OK" });
    } catch {
        throw error(500);
    }
}) satisfies RequestHandler;
