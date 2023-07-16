import mariadb from "mariadb";
import { PrismaClient } from "@prisma/client";
import { Organization as OrgEnum } from "@prisma/client";

const prisma = new PrismaClient();

type Organization = {
    name: string;
    offset: number;
    files: string;
    enum: OrgEnum;
};

const organizations: Array<Organization> = [
    {
        name: "gsr",
        offset: 0,
        files: "https://gentsestudentenraad.be/static/persistent",
        enum: "GSR",
    },
    { name: "ppsr", offset: 1000, files: "https://ppsr.ugent.be/static/persistent", enum: "PPSR" },
    { name: "fris", offset: 2000, files: "https://fris.ugent.be/static/persistent", enum: "FRIS" },
    {
        name: "sturec",
        offset: 3000,
        files: "https://sturec.ugent.be/static/persistent",
        enum: "STUREC",
    },
    {
        name: "stura",
        offset: 4000,
        files: "https://stura.ugent.be/static/persistent",
        enum: "STURA",
    },
    { name: "bsr", offset: 5000, files: "https://bsr.ugent.be/static/persistent", enum: "BSR" },
    {
        name: "stuart",
        offset: 6000,
        files: "https://stuart.ugent.be/static/persistent",
        enum: "STUART",
    },
    {
        name: "stuff",
        offset: 7000,
        files: "https://stuff.ugent.be/static/persistent",
        enum: "STUFF",
    },
    {
        name: "stubio",
        offset: 8000,
        files: "https://stubio.ugent.be/static/persistent",
        enum: "STUBIO",
    },
    {
        name: "stuveco",
        offset: 9000,
        files: "https://stuveco.ugent.be/static/persistent",
        enum: "STUVECO",
    },
];

// https://stackoverflow.com/a/7616484
function hashCode(input: string): number {
    let hash = 0;

    for (let i = 0; i < input.length; i++) {
        hash = (hash << 5) - hash + input.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }

    return hash % 10000;
}

async function opinionGroup(org: Organization, maria: mariadb.Connection) {
    const rows = (await maria.query(`
        SELECT
        p.id as id,
        p.name as name,
        p.\`rank\` as sort_index,
        null as about
        FROM policy p;
    `)) as any[];

    await prisma.opinionGroup.createMany({
        data: rows.map((row) => {
            return {
                id: row.id + org.offset,
                name: row.name,
                about: null,
                sort_index: row.sort_index ?? 0,
                organization: org.enum,
            };
        }),
    });
}

async function opinion(org: Organization, maria: mariadb.Connection) {
    const rows = (await maria.query(`
        SELECT
            s.id,
            NULLIF(s.name, '') as title,
            NULLIF(s.description, '') as about,
            f.path as document_link,
            s.policy_id as opinion_group,
            str_to_date(concat(s.year,'-09-01'), '%Y-%m-%d') as published_at,
            s.visible as published
        FROM standpoint s
        LEFT JOIN file f on s.file_id = f.id
        WHERE s.policy_id IS NOT NULL AND s.name NOT LIKE '';
    `)) as any[];

    await prisma.opinion.createMany({
        data: rows.map((row) => {
            return {
                id: row.id + org.offset,
                title: row.title,
                about: row.about,
                document_link: `${org.files}/files/${row.document_link}`,
                organization: org.enum,
                published: row.published > 0,
                published_at: row.published_at,
                opinion_group_id: row.opinion_group + org.offset,
            };
        }),
    });
}

async function news(org: Organization, maria: mariadb.Connection) {
    const rows = (await maria.query(`
        SELECT
            n.id AS id,
            n.title AS title,
            n.text AS content,
            SUBSTRING(n.text, 1, 100) AS synopsis,
            n.public AS published,
            n.date AS published_at,
            n.author AS author,
            i.path AS banner_image,
            i.name as banner_image_alt
        FROM news n
        LEFT JOIN image i on n.image_id = i.id;
    `)) as any[];

    await prisma.news.createMany({
        data: rows.map((row) => {
            return {
                id: row.id + org.offset,
                title: row.title,
                content: row.content,
                synopsis: row.synopsis,
                published: row.published > 0,
                published_at: row.published_at,
                author: row.author,
                banner_image: `${org.files}/images/${row.banner_image}`,
                banner_image_alt: row.banner_image_alt,
                organization: org.enum,
            };
        }),
    });
}

async function questionCategory(org: Organization, maria: mariadb.Connection) {
    const rows = (await maria.query(`
        SELECT
            ASCII(SUBSTRING(fs.abbr, 1, 1)) * ASCII(SUBSTRING(fs.abbr, 2, 2)) as id,
            IF(fs.\`rank\` IS NULL, 0, fs.\`rank\`) as sort_index,
            fs.name as title,
            IF(fs.description = '', NULL, fs.description) as description,
            fs.abbr as slug
        FROM faq_subject fs;
    `)) as any[];

    await prisma.questionCategory.createMany({
        data: rows.map((row) => {
            return {
                id: parseInt(row.id) + org.offset,
                title: row.title,
                sort_index: parseInt(row.sort_index),
                organization: org.enum,
                description: row.description,
                slug: row.slug,
            };
        }),
    });
}

async function question(org: Organization, maria: mariadb.Connection) {
    const rows = (await maria.query(`
        SELECT
            f.id as id,
            f.title as question,
            f.text as answer,
            ASCII(SUBSTRING(s.abbr, 1, 1)) * ASCII(SUBSTRING(s.abbr, 2, 2)) as question_category_id
        FROM faq f
        LEFT JOIN faq_subsubject fs on fs.id = f.subsubject_id
        LEFT JOIN faq_subject s on fs.subject_abbr = s.abbr
        WHERE s.abbr IS NOT NULL;
    `)) as any[];

    await prisma.question.createMany({
        data: rows.map((row) => {
            return {
                id: row.id + org.offset,
                question: row.question,
                answer: row.answer,
                question_category_id: parseInt(row.question_category_id) + org.offset,
                sort_index: 0,
                organization: org.enum,
            };
        }),
    });
}

async function group(org: Organization, maria: mariadb.Connection) {
    const rows = (await maria.query(`
        SELECT
            g.abbr as id,
            g.name,
            IF(g.text = '', NULL, g.text) as description
        FROM \`group\` g;
    `)) as any[];

    await prisma.personGroup.createMany({
        data: rows.map((row) => {
            return {
                id: hashCode(row.id) + org.offset,
                name: row.name,
                organization: org.enum,
                sort_index: 0,
                description: row.description,
            };
        }),
    });
}

async function person(org: Organization, maria: mariadb.Connection) {
    const rows = (await maria.query(`
        SELECT s.id, s.first_name, s.last_name, i.path, s.email
        FROM stuver s
        LEFT JOIN image i on i.id = s.image_id;
    `)) as any[];

    await prisma.person.createMany({
        data: rows.map((row) => {
            return {
                id: row.id + org.offset,
                name: `${row.first_name} ${row.last_name}`,
                organization: org.enum,
                image: row.path ? `${org.files}/images/${row.path}` : null,
                mail: row.email,
            };
        }),
    });
}

async function users(org: Organization, maria: mariadb.Connection) {
    const rows = (await maria.query(`
        SELECT * FROM \`user\` u
        LEFT OUTER JOIN roles_users ru on u.id = ru.user_id
        WHERE ru.role_id != 3 AND u.username IS NOT NULL;
    `)) as any[];

    for (const row of rows) {
        await prisma.user.upsert({
            create: {
                email: row.email,
                given_name: row.firstname,
                username: row.username,
                student: false,
                surname: row.lastname,
            },
            update: {
                email: row.email,
                given_name: row.firstname,
                username: row.username,
                surname: row.lastname,
            },
            where: {
                username: row.username,
            },
        });
    }

    for (const row of rows) {
        if (row.role_id === 1) {
            await prisma.admin.create({
                data: {
                    organization: org.enum,
                    user: {
                        connect: {
                            username: row.username,
                        },
                    },
                },
            });
        } else if (row.role_id === 2) {
            await prisma.user.update({
                data: {
                    student: true,
                },
                where: {
                    username: row.username,
                },
            });
        }
    }
}

async function position(org: Organization, maria: mariadb.Connection) {
    const rows = (await maria.query(`
        SELECT DISTINCT
            p.id as id,
            p.year as year,
            p2.name as name,
            p2.\`rank\` as sort_index,
            se.education as education,
            s.id as person_id,
            p2.group_abbr as person_group
        FROM stuver_position p
        LEFT JOIN position p2 on p2.abbr = p.position_abbr
        LEFT JOIN stuver s on s.id = p.stuver_id
        LEFT JOIN stuver_education se on s.id = se.stuver_id
        WHERE p2.group_abbr IS NOT NULL
        GROUP BY p.year, p2.name, person_id;
    `)) as any[];

    await prisma.personPosition.createMany({
        data: rows
            .filter((e) => e.person_id && e.person_group)
            .map((row) => {
                return {
                    id: row.id + org.offset,
                    name: row.name,
                    education: row.education,
                    organization: org.enum,
                    year: row.year,
                    sort_index: row.sort_index ?? 0,
                    person_id: row.person_id + org.offset,
                    person_group_id: hashCode(row.person_group) + org.offset,
                };
            }),
    });
}

async function elections(org: Organization, maria: mariadb.Connection) {
    const rows = (await maria.query(`
        SELECT p.*, f.path
        FROM position p
        LEFT JOIN file f on f.id = p.file_id
        WHERE p.group_abbr = 'db' OR p.group_abbr = 'bv' OR p.group_abbr = 'enlight';
    `)) as any[];

    const getId = (tag: string): number => {
        tag = tag.toLowerCase();
        if (tag === "db") {
            return org.offset;
        } else if (tag === "bv") {
            return org.offset + 1;
        } else if (tag === "enlight") {
            return org.offset + 2;
        } else {
            throw Error(`Unknown tag: ${tag}`);
        }
    };

    await prisma.electionGroup.createMany({
        data: [
            {
                organization: org.enum,
                description: null,
                sort_index: 0,
                name: "Algemeen",
                id: org.offset,
            },
            {
                organization: org.enum,
                description: null,
                sort_index: 1,
                name: "Functieprofielen beleidsverantwoordelijken",
                id: org.offset + 1,
            },
            {
                organization: org.enum,
                description: null,
                sort_index: 2,
                name: "Functieprofielen student-coördinator ENLIGHT",
                id: org.offset + 2,
            },
        ],
    });

    await prisma.election.createMany({
        data: rows.map((row) => {
            return {
                organization: org.enum,
                description: row.description === "" ? null : row.description,
                title: row.name,
                sort_index: row.rank ?? 0,
                document: row.path ?? null,
                public: row.active === 1,
                election_group_id: getId(row.group_abbr),
            };
        }),
    });
}

const tables = [
    "news",
    "opinion",
    "opinion_group",
    "person",
    "person_group",
    "person_position",
    "question",
    "question_category",
    "admin",
    "public.user",
    "election",
    "election_group",
];

// Reset tables in Postgres
await Promise.all(
    tables.map((table) => {
        return prisma.$queryRawUnsafe(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE;`);
    }),
);

// Fill tables
await Promise.all(
    organizations.map(async (org) => {
        const maria = await mariadb.createConnection({
            host: "localhost",
            user: org.name,
            password: org.name,
            database: `${org.name}-prod`,
            port: 3306,
        });

        console.log(`${org.name.toUpperCase()}: opinion groups`);
        await opinionGroup(org, maria);

        console.log(`${org.name.toUpperCase()}: opinion`);
        await opinion(org, maria);

        console.log(`${org.name.toUpperCase()}: news`);
        await news(org, maria);

        console.log(`${org.name.toUpperCase()}: question category`);
        await questionCategory(org, maria);

        console.log(`${org.name.toUpperCase()}: question`);
        await question(org, maria);

        console.log(`${org.name.toUpperCase()}: group`);
        await group(org, maria);

        console.log(`${org.name.toUpperCase()}: person`);
        await person(org, maria);

        console.log(`${org.name.toUpperCase()}: position`);
        await position(org, maria);

        console.log(`${org.name.toUpperCase()}: user`);
        await users(org, maria);

        console.log(`${org.name.toUpperCase()}: elections`);
        await elections(org, maria);
    }),
);

// Update incrementer
await Promise.all(
    tables.map((table) => {
        return prisma.$queryRawUnsafe(
            `SELECT setval(pg_get_serial_sequence('${table}', 'id'), coalesce(max(id)+1, 1), false) FROM ${table};`,
        );
    }),
);

console.log("Done");
process.exit(0);
