import { Chance } from "chance";

export class NewsItem {
    id!: number
    title_en!: string
    contents_en!: string
    title_nl!: string
    contents_nl!: string
    synopsis_en!: string
    synopsis_nl!: string
    published!: boolean
    published_at!: Date
    author!: string
    banner_image!: string
    banner_image_alt!: string

    constructor(data: Partial<NewsItem>) {
        Object.assign(this, data)
    }

    static getAll(n: number = 100): Array<NewsItem> {
        const chance = Chance()

        return Array.from(Array(n).keys()).map(e => (
            {
                id: chance.integer(),
                title_en: chance.sentence({words: chance.integer({min: 2, max: 7})}),
                contents_en: chance.paragraph(),
                title_nl: chance.sentence(),
                contents_nl: chance.paragraph(),
                synopsis_en: chance.paragraph({ sentences: 1 }),
                synopsis_nl: chance.paragraph({ sentences: 1 }),
                published: true,
                published_at: chance.date(),
                author: chance.name(),
                banner_image: `http://source.unsplash.com/random/500x${500 + e}/?newspaper`,
                banner_image_alt: "Newspaper"
            }
        ));
    }
}

