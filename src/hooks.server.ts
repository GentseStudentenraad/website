import { Organization } from '@prisma/client';
import type { ResolveOptions } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/private';
import { prisma } from '$lib/Prisma';
import { Language } from '$lib/Language';

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

	const configs = await prisma.configuration.findMany();
	let organization = configs.filter((c) => c.hostnames.includes(requestedHost)).at(0)?.organization;

	if (organization === undefined) {
		return new Response(
			'400: bad request. You have connected to the server using an invalid hostname.',
			{ status: 400 }
		);
		// handle error
	}

	// @ts-ignore
	event.locals.organization = organization;

	// Retrieve the configuration of the website, and if missing, throw an error.
	const configuration = await prisma.configuration.findUnique({
		where: {
			organization: organization!
		}
	});

	// @ts-ignore
	event.locals.configuration = configuration;

	// An optional language URL parameter which indicates which language to use.
	// Defaults to Dutch for obvious reasons.
	const language = event.params.language === 'en' ? Language.ENGLISH : Language.DUTCH;

	// @ts-ignore
	event.locals.language = language;

	return await resolve(event);
}
