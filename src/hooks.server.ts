import { type Handle, redirect } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import { Language } from "$lib/Language";

// TODO: CAS authentication.
// TODO: Should not default to GSR, but fine for development.
export const handle = (async ({ event, resolve }) => {
    console.log(`${new Date().toISOString()} ${event.request.method} ${event.url.pathname}`);

    // Setting the language even if not supplied makes i18n much easier!
    if (event.params.language === "") {
        throw redirect(302, `/nl${event.url.pathname}`);
    }

    // Retrieve the selected organization based on:
    // 1. A URL query such as `?host=gentsestudentenraad.be`, for development purposes.
    // 2. The hostname contained in the request headers.
    const requestedHost = event.url.searchParams.get("host") || event.url.hostname;

    const configuration = await prisma.configuration.findFirstOrThrow({
        where: {
            hostnames: {
                has: requestedHost,
            },
        },
    });

    const language = event.params.language === "en" ? Language.ENGLISH : Language.DUTCH;

    event.locals.configuration = configuration;
    event.locals.language = language;

    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace("%lang%", event.params.language ?? "en"),
    });
}) satisfies Handle;
