import { json, error } from '@sveltejs/kit';
import { prisma } from '$lib/Prisma';
import type { Configuration } from '@prisma/client';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const res: Configuration = await request.json();

	// Remove empty strings in favor of null.
	Object.keys(res).forEach(function (key, index) {
		// @ts-ignore
		if (res[key] === '') {
			// @ts-ignore
			res[key] = null;
		}
	});

	try {
		await prisma.configuration.update({
			data: res,
			where: {
				organization: res.organization
			}
		});
		return json({ message: 'OK' });
	} catch {
		throw error(500);
	}
};
