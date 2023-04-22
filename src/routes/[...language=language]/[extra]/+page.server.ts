import { marked } from "marked";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/Prisma";
import { Language } from "$lib/Language";
import { error } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ params, locals }) => {
    const post = await prisma.page.findFirstOrThrow({
        where: {
            slug: params.extra, // TODO: SQL INJECTION?
            organization: locals.configuration.organization,
        },
    });

    const config = post.config as Prisma.JsonObject;

    const source = locals.language == Language.DUTCH ? post.content_dutch : post.content_english;

    if (!source) {
        throw error(404, { message: "Not found" });
    }

    const html = marked(source);

    if (!html) {
        throw error(500, { message: "Internal server error" });
    }

    return {
        contents: html,
        banner: config["banner"] ?? "",
        banner_alt: config["banner_alt"] ?? "",
    };
}) satisfies PageServerLoad;
