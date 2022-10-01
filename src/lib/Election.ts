import { Chance } from 'chance';

export class ElectionGroup {
	id!: number;
	title!: string;
	about: string;
	elections: Array<Election>;

	static getAll(n: number = 100): Array<ElectionGroup> {
		const chance = Chance();

		return Array.from(Array(n).keys()).map(() => ({
			id: chance.integer(),
			title: chance.sentence({ words: chance.integer({ min: 1, max: 4 }) }),
			about: chance.paragraph({ sentences: 5 }),
			elections: Election.getAll(5)
		}));
	}
}

export class Election {
	id!: number;
	title!: string;
	about: string;
	document_link: string | null = null;

	static getAll(n: number = 100): Array<Election> {
		const chance = Chance();

		return Array.from(Array(n).keys()).map(() => ({
			id: chance.integer(),
			title: chance.sentence({ words: chance.integer({ min: 1, max: 4 }) }),
			about: chance.paragraph({ sentences: 5 }),
			document_link: chance.integer({ min: 0, max: 1 }) === 0 ? '/404.pdf' : null
		}));
	}
}
