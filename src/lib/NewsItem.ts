import { Chance } from "chance";
import { Language } from "./Language";

export class NewsItem {
    id!: number
    title!: string
    content!: string
    synopsis!: string
    published!: boolean
    published_at!: Date
    author!: string
    banner_image!: string
    banner_image_alt!: string

    constructor(data: Partial<NewsItem>) {
        Object.assign(this, data)
    }

    static getAll(language: Language = Language.DUTCH, n: number = 100): Array<NewsItem> {
        const chance = Chance()

        return Array.from(Array(n).keys()).map(e => (
            {
                id: chance.integer(),
                title: chance.sentence({words: chance.integer({min: 2, max: 7})}),
                content: chance.paragraph(),
                synopsis: chance.paragraph({ sentences: 1 }),
                published: true,
                published_at: chance.date(),
                author: chance.name(),
                banner_image: `http://source.unsplash.com/random/500x${500 + e}/?newspaper`,
                banner_image_alt: "Newspaper"
            }
        ));
    }
}

