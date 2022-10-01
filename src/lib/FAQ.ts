import { Chance } from 'chance';
import { Language } from './Language';

export class QuestionAnswer {
	id!: number;
	question!: string;
	answer!: string;
	rank!: number;

	constructor(data: Partial<QuestionAnswer>) {
		Object.assign(this, data);
	}

	static getOne(): QuestionAnswer {
		const chance = Chance();

		return {
			id: chance.integer(),
			question: chance.sentence({ words: 6 }),
			answer: chance.paragraph(),
			rank: chance.integer()
		};
	}
}

export class QuestionCategory {
	id!: number;
	rank!: number;
	title!: string;
	contents!: Array<QuestionAnswer>;
	slug!: string;

	constructor(data: Partial<QuestionCategory>) {
		Object.assign(this, data);
	}

	static getAll(language: Language = Language.DUTCH, n: number = 10): Array<QuestionCategory> {
		const chance = Chance();

		return Array.from(Array(n).keys()).map((e) => ({
			id: chance.integer(),
			rank: chance.integer(),
			title: chance.sentence({ words: 5 }),
			contents: Array.from(Array(10).keys()).map((e) => QuestionAnswer.getOne()),
			slug: `category${e}`
		}));
	}
}
