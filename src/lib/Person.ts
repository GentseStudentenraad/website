import { Chance } from "chance";

export class Person {
    id!: number
    name!: string
    image!: string
    mail: string | null = null

    constructor(data: Partial<Person>) {
        Object.assign(this, data)
    }

    static getOne() : Person {
        return {
            id: Chance().integer(),
            name: Chance().name(),
            image: `http://source.unsplash.com/random/500x${500 + Chance().integer({min: -10, max: 10})}/?girl`,
            mail: Chance().integer({min: 0, max: 1}) === 0 ? null : Chance().email()
        }
    }
}

export class Position {
    id!: number
    year!: number
    name!: string
    rank!: number
    education!: string
    person!: Person

    constructor(data: Partial<Position>) {
        Object.assign(this, data)
    }

    static getOne() : Position {
        const chance = Chance()

        return {
            id: chance.integer(),
            year: chance.integer({min: 2015, max: 2022}),
            name: chance.word(),
            rank: chance.integer(),
            education: `Bachelor in de ${chance.sentence({words: 2})}`,
            person: Person.getOne()
        };
    }
}

export class Group {
    id!: number
    name!: string
    description!: string
    positions!: Array<Position>

    constructor(data: Partial<Group>) {
        Object.assign(this, data)
    }

    static getOne(index: number) : Group {
        const possibilities = [
            "Dagelijks Bestuur",
            "Beleidsverantwoordelijken",
            "Raad van Bestuur",
            "Sociale Raad",
            "Bestuurscollege",
            "Onderwijsraad",
            "Onderwijskwaliteitsbureau",
            "Medewerkers"
        ];

        return {
            id: index,
            name: possibilities[index],
            description: Chance().paragraph(),
            positions: Array.from(Array(5).keys()).map(() => Position.getOne())
        }
    }

    static getAll() : Array<Group> {
       return Array.from(Array(7).keys()).map(i => Group.getOne(i))
    }
}