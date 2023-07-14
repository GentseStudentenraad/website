import { error, text } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { RequestHandler } from "./$types";

export const GET = (async ({ params }) => {
    try {
        const cal = await prisma.calendar.findUniqueOrThrow({
            where: {
                id: Number.parseInt(params.id),
            },
        });

        const res = await fetch(cal.url);
        const data = await res.text();
        return text(data);
    } catch (err) {
        console.error(err);
        throw error(500);
    }
}) satisfies RequestHandler;
