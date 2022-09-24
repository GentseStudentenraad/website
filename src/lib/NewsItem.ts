import { Chance } from "chance";
import { Language } from "./Language";

const test = `
## Iano dixerat rescindere Lycaon

Lorem markdownum Athin, cum dei nato hospite vipera non sine. Spreto arcet aras
omnes tota passi, tibi territa, uni puellari *et tostae*, exstinctum ite
dotatissima Aeacidae cingebat. [Quoque narrat](http://nudare.net/membra), fictos
temperat suus. Pugnem illa loquendo bracchia alter tremuere quid ingemuit imbre
acie *nomina* Libye *melliferarum*? Commenta magno per satis mea, quo illa
caelum urbis limes praestantior minetur tardantis miratur.

1. Nec hasta fune tecta in ferrum
2. Illa habet pater sparsisque quaeque terga dies
3. Myscelus ferrum non enixa ipso miserrima Olenos
4. Tulerat exul pro terramque hic Venus uncos
5. Aliquisque hic animaeque
6. Tempus cum opem illo me morantia occupat

## Quem erat redit aethera et lucis confugisse

Iuga quoque humana, inde soror inclusum, aequantibus hanc? Utque auras fuit,
herba auctor **gesserat** ardet templa vidit. Est arva an, dare corpus dicta, in
modo, regis.

    if (latency_rgb_graphics(device(54), andOn, truncate_firmware(user,
            permalink))) {
        slashdot_mca.service_process_goodput.sla(fileGbps, memory_minisite + 3);
        userAiff.web = 3;
        bus.expressionGnutella(baud, ebookKbpsIsdn);
    } else {
        sector.lun(hyperlink_cpa_sql);
        code = vector_code_memory(itWimaxActive, hit_traceroute + software);
    }
    pmu_system_character.vlog = format_boolean_viral(party(aspOlapRup),
            digitalFlowchart(3, multiprocessing_word));
    play_keystroke.isoRing += burn;
    bitHackerWhite -= perl.dimmHardGoodput.cut(-2) + 5 - ripcording_phreaking +
            memory;

## Iuvat parientis me longo Deucalion

Letum praedae deducunt fata arva illum memorat, suae unda in pulvis. Se vinci
plus quae veros Iovis serpentigenis sine properataque dic intendens et inter
auditurum et **loca atque** sunt. Animo pater notae iuvenilior falsaque huic.
Ipse ex infelix grave praeferrer vultu genitore, mansit quaque per fessum
amoris. Surrentino ludere manus osculaque
[patruelibus](http://www.aversos.io/et-ide), quater cum forti: parsque arcumque
Pallas.

Ramus iustitia Cyclopis felicissima latus tempus. Illa Hymenaee arte constitit
templa quisquis capit aequales crinem integer ardent quam Solis iungimus tunc
lacte fonti.

Rex tulit, rostroque minari! Saturnia adspexi decepto penates atque classem
Minervae, hoc videre foedera regit auctor monimenta tardae cursus, et Ladonis
conde. Semiramio vidi. Reliquit *patresque secures* sic novae est imperio
suadet. Argo ictu moenia, vincis pallidaque tecta.
`

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

    static getOne(language: Language = Language.DUTCH, id: number) {
        const chance = Chance()

        return {
            id: chance.integer(),
            title: chance.sentence({words: chance.integer({min: 2, max: 7})}),
            content: test,
            synopsis: chance.paragraph({ sentences: 1 }),
            published: true,
            published_at: chance.date(),
            author: chance.name(),
            banner_image: `http://source.unsplash.com/random/500x500/?newspaper`,
            banner_image_alt: "Newspaper"
        };
    }
}

