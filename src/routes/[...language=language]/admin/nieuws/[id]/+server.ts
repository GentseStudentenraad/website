import { json, error } from '@sveltejs/kit';
import { prisma} from '$lib/Prisma';
import type { News } from '@prisma/client';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const res: News = await request.json();

    // Remove empty strings in favor of null.
    Object.keys(res).forEach(function(key, index) {
        // @ts-ignore
        if (res[key] === "") {
            // @ts-ignore
            res[key] = null;
        }
    });

    try {
        await prisma.news.update({
            data: res,
            where: {
                id: res.id
            }
        });
        return json({message: "OK"});
    } catch {
        throw error(500);
    }
}
