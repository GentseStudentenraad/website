import { prisma } from '$lib/Prisma';

export const prerender = false;
export const ssr = true;
export const csr = true;

// @ts-ignore
export async function load({ params, url, locals }) {
    const configuration = await prisma.configuration.findUnique({
        where: {
            organization: locals.organization!
        }
    })

	return {
		configuration
	};
}
