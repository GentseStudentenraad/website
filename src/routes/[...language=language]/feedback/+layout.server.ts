import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ locals }) => {
    if (!locals.configuration.feedback_section) {
        throw error(404, "Not Found");
    }

    return {};
}) satisfies LayoutServerLoad;
