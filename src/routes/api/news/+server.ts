import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { RequestHandler } from "./$types";
import { Prisma } from "@prisma/client";

export const POST = (async ({ request, params }) => {
    const res: Prisma.NewsCreateInput = await request.json();

    try {
        await prisma.news.create({
            data: res,
        });
        return json({ message: "OK" });
    } catch (err) {
        console.log(err);
        throw error(500);
    }
}) satisfies RequestHandler;
