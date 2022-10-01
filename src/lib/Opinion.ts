import 'chance';
import { Chance } from 'chance';

export class OpinionGroup {
	id!: number;
	rank!: number;
	name: string;
	about: string;

	static getAll(): Array<OpinionGroup> {
		return [];
	}
}

export class Opinion {
	id!: number;
	published_at!: Date;
	title!: string;
	about!: string;
	document_link!: string;

	static getOne(): Opinion {
		return {
			id: 0,
			published_at: new Date(),
			title: Chance().sentence(),
			about: Chance().paragraph(),
			document_link: '/404.pdf'
		};
	}
}
