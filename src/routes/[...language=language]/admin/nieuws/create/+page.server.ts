import { prisma } from "$lib/Prisma";
import type { PageServerLoad } from "./$types";
import { Prisma } from "@prisma/client";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ locals }) => {
    const news_item: Prisma.NewsUncheckedCreateInput = {
        organization: locals.configuration.organization,
        author: "",
        content: "",
        title: "",
        published: false,
        banner_image: "",
        banner_image_alt: "",
        synopsis: "",
        published_at: new Date(),
    };

    return {
        news_item,
    };
}) satisfies PageServerLoad;
