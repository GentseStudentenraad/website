import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import type { Configuration } from "@prisma/client";
import type { RequestHandler } from "./$types";

export const PUT = (async ({ request }) => {
    const res: Configuration = await request.json();

    try {
        await prisma.configuration.update({
            data: res,
            where: {
                organization: res.organization,
            },
        });
        return json({ message: "OK" });
    } catch {
        throw error(500);
    }
}) satisfies RequestHandler;
