import { Organization } from '@prisma/client';
import { CalendarItem } from '$lib/CalendarItem';
import { parseICS } from "ical";
import { prisma } from '$lib/Prisma';


// Cache all the events in the calendar at startup. Should ideally be moved in
// the database directly since this is terribly slow.
export const calender: Promise<Map<Organization, Array<CalendarItem>>> = (async () => {
    console.log(`${new Date().toISOString()} - INFO - Fetching calendars`)

    const calendars = await prisma.calendar.findMany();
    const result = new Map();

    for (const calendar of calendars) {
        if (!result.has(calendar.organization)) {
            result.set(calendar.organization, []);
        }

        const items = result.get(calendar.organization);

        const file = await fetch(calendar.url);
        const data = await file.text();
        const list = parseICS(data);

        for (const entry of Object.entries(list)) {
            const dict = entry[1];

            if (dict.type === "VEVENT") {
                const value = {
                    id: dict.uuid ?? '',
                    title: dict.summary ?? '',
                    contents: dict.description ?? '',
                    start_time: dict.start ?? new Date(),
                    end_time: dict.end ?? new Date(),
                    location: dict.location ?? '',
                    calendarName: calendar.name,
                } as CalendarItem;
                items.push(value);
            }
        }
    }

    for (const key of result.keys()) {
        result.set(key, result.get(key).sort((a: CalendarItem, b: CalendarItem) => b.start_time.valueOf() - a.start_time.valueOf()))
    }

    console.log(`${new Date().toISOString()} - INFO - Fetching calendars (done)`)

    return result;
})();
