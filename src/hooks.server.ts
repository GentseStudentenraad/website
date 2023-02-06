import type { RequestEvent, ResolveOptions } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/private';
import { prisma } from '$lib/Prisma';
import { Language } from '@prisma/client';

// TODO: CAS authentication.
// TODO: Should not default to GSR, but fine for development.
export async function handle({
	event,
	resolve
}: {
	event: RequestEvent;
	resolve(event: RequestEvent, opts?: ResolveOptions): MaybePromise<Response>;
}) {
	// Retrieve the selected organization based on:
	// 1. A URL query such as `?host=gentsestudentenraad.be`, for development purposes.
	// 2. The hostname contained in the request headers.
	const requestedHost = event.url.searchParams.get('host') || event.url.hostname;

	const configuration = await prisma.configuration.findFirst({
        where: {
            hostnames: {
                has: requestedHost
            }
        }
    });

    if (configuration == null) {
        return new Response(
            "500: Internal Server Error",
            { status: 500 }
        )
    }

	const language = event.params.language === 'en' ? Language.ENGLISH : Language.DUTCH;

    event.locals.configuration = configuration;
	event.locals.language = language;

    console.log(`${new Date().toLocaleTimeString()} - ${language}`)

	return await resolve(event);
}
