import { prisma } from "$lib/Prisma";
import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ locals }) => {
    if (!locals.user) {
        throw error(401, "Unauthorized");
    } else if (!locals.admin) {
        throw error(403, "Forbidden");
    }

    const groupCount = prisma.personGroup.count({
        where: {
            organization: locals.configuration.organization,
        },
    });

    const personCount = prisma.person.count({
        where: {
            organization: locals.configuration.organization,
        },
    });

    const userCount = prisma.user.count();

    const questionCount = prisma.question.count({
        where: {
            organization: locals.configuration.organization,
        },
    });

    const projectCount = prisma.project.count({
        where: {
            organization: locals.configuration.organization,
        },
    });

    const opinionCount = prisma.opinion.count({
        where: {
            organization: locals.configuration.organization,
        },
    });

    const i18nCount = prisma.i18n.count({
        where: {
            organization: locals.configuration.organization,
        },
    });

    return {
        i18nCount,
        opinionCount,
        projectCount,
        userCount,
        groupCount,
        personCount,
        questionCount,
    };
}) satisfies LayoutServerLoad;
