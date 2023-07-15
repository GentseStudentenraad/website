import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/Prisma";
import { Prisma } from "@prisma/client";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ locals, params }) => {
    const opinion: Prisma.OpinionUncheckedCreateInput = {
        organization: locals.configuration.organization,
        opinion_group_id: Number.parseInt(params.group),
        title: "",
        about: "",
        document_link: "",
        published: false,
        published_at: new Date(),
    };

    return {
        opinion,
    };
}) satisfies PageServerLoad;
