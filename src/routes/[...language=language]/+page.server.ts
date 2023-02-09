import { Language } from '$lib/Language';
import { CalendarItem } from '$lib/CalendarItem';
import { prisma } from '$lib/Prisma';
import type { PageServerLoad } from './$types';
import { parseICS } from "ical";

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load = (async ({ params, locals, fetch }) => {
    const _ = params.language;

    const SOURCE_URL = "https://calendar.google.com/calendar/ical/gentsestudentenraad.be_k37f6bonoji57h4e40r6n0npnc%40group.calendar.google.com/public/basic.ics";
    const file = await fetch(SOURCE_URL);
    const data = await file.text();
    const calendar = parseICS(data);

    let calendarItems = [];

    for (const item of Object.entries(calendar)) {
        const dict = item[1];

        if (dict.type === "VEVENT") {
            const value = {
                id: dict.uuid ?? '',
                title: dict.summary ?? '',
                contents: dict.description ?? '',
                start_time: dict.start ?? new Date(),
                end_time: dict.end ?? new Date(),
                location: dict.location ?? '',
            } as CalendarItem;
            calendarItems.push(value);
        }
    }

    calendarItems = calendarItems.sort((a, b) => b.start_time.getTime() - a.start_time.getTime())

	const news = await prisma.news.findMany({
		orderBy: [
			{
				published: 'desc'
			}
		],
		where: {
			organization: locals.configuration.organization
		},
		take: 4
	});

	return {
		calendar: calendarItems,
		news,
	};
}) satisfies PageServerLoad;
