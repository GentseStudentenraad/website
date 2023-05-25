import { type Handle, redirect } from "@sveltejs/kit";
import { prisma } from "$lib/Prisma";
import { Language } from "$lib/Language";

export const handle = (async ({ event, resolve }) => {
    const start = new Date();

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

    const response = await resolve(event, {
        transformPageChunk: ({ html }) => html.replace("%lang%", event.params.language ?? "en"),
    });

    console.log(
        `${start.toISOString()} ${event.request.method} ${event.url.pathname} ${
            Date.now() - start.valueOf()
        }ms ${response.status}`,
    );

    return response;
}) satisfies Handle;
