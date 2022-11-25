import {Chance} from 'chance';
import {Language} from './Language';

export class CalendarItem {
	id!: number;
	title!: string;
	contents!: string;
	start_time!: Date;
	end_time!: Date;
	location!: string;

	constructor(data: Partial<CalendarItem>) {
		Object.assign(this, data);
	}

	static getAll(language: Language = Language.DUTCH, n: number = 100): Array<CalendarItem> {
		const chance = Chance();

		return Array.from(Array(n).keys()).map(() => ({
			id: chance.integer(),
			title: chance.sentence({ words: chance.integer({ min: 1, max: 4 }) }),
			contents: chance.paragraph({ sentences: 1 }),
			start_time: chance.date(),
			end_time: chance.date(),
			location: chance.sentence().slice(0, 30)
		}));
	}
}
