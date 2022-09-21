import { Chance } from "chance";
import { Language } from "./Language";

export class NewsItem {
    id!: number
    title_en!: string
    title_nl!: string
    contents_en!: string
    contents_nl!: string
    start_time!: Date
    end_time!: Date
    location_en!: string
    location_nl!: string

    constructor(data: Partial<NewsItem>) {
        Object.assign(this, data)
    }

    static getAll(language: Language = Language.DUTCH, n: number = 100): Array<NewsItem> {
        const chance = Chance()

        return Array.from(Array(n).keys()).map(() => (
            {
                id: chance.integer(),
                title_en: chance.sentence({words: chance.integer({min: 2, max: 7})}),
                title_nl: chance.sentence(),
                contents_en: chance.paragraph(),
                contents_nl: chance.paragraph(),
                start_time: chance.date(),
                end_time: chance.date(),
                location_en: chance.sentence(),
                location_nl: chance.sentence()
            }
        ));
    }
}

