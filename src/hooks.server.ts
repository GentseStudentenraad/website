import { Organization } from '@prisma/client';
import type { ResolveOptions } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/private';

const hosts = {
	'gentsestudentenraad.be': Organization.GSR,
	'ppsr.gentsestudentenraad.be': Organization.PPSR,
	'fris.gentsestudentenraad.be': Organization.FRIS,
	'stuw.gentsestudentenraad.be': Organization.STUW,
	'sturec.gentsestudentenraad.be': Organization.STUREC,
	'stuart.gentsestudentenraad.be': Organization.STUART,
	'bsr.gentsestudentenraad.be': Organization.BSR,
	'stuveco.gentsestudentenraad.be': Organization.STUVECO,
	'stura.gentsestudentenraad.be': Organization.STURA,
	'stubio.gentsestudentenraad.be': Organization.STUBIO,
	'dsr.gentsestudentenraad.be': Organization.DSR,
	'stugg.gentsestudentenraad.be': Organization.STUGG,
	'stuff.gentsestudentenraad.be': Organization.STUFF
};

// TODO: CAS authentication.
// TODO: Should not default to GSR, but fine for development.
export async function handle({
	event,
	resolve
}: {
	event: RequestEvent;
	resolve(event: RequestEvent, opts?: ResolveOptions): MaybePromise<Response>;
}) {
	// @ts-ignore
	event.locals.organization = Organization.GSR;

	// Retrieve the selected organization based on:
	// 1. A URL query such as `?host=gentsestudentenraad.be`, for development purposes.
	// 2. The hostname contained in the request headers.
	const requestedHost = event.url.searchParams.get('host') || event.url.hostname;

	for (const [potentialHost, organization] of Object.entries(hosts)) {
		if (requestedHost == potentialHost) {
			// @ts-ignore
			event.locals.organization = organization;
			break;
		}
	}

	return await resolve(event);
}
