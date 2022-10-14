import mariadb from 'mariadb';
import postgres from 'postgres';

const post = postgres({
	host: '127.0.0.1',
	user: 'jens',
	password: ''
});

const organizations = [
	{ name: 'gsr', offset: 0 },
	{ name: 'ppsr', offset: 1000 },
	{ name: 'fris', offset: 2000 },
	{ name: 'sturec', offset: 3000 },
	{ name: 'stura', offset: 4000 },
	{ name: 'bsr', offset: 5000 },
	{ name: 'stuart', offset: 6000 },
	{ name: 'stuff', offset: 7000 },
	{ name: 'stubio', offset: 8000 }
];

// https://stackoverflow.com/a/7616484
String.prototype.hashCode = function () {
	var hash = 0,
		i,
		chr;
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
		chr = this.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash % 10000;
};

async function opinionGroup(org, maria) {
	const rows = await maria.query(`
        SELECT
        p.id as id,
        p.name as name,
        p.\`rank\` as sort_index,
        null as about
        FROM policy p;
    `);

	for (const row of rows) {
		await post`
          insert into opinion_group
            (id, name, about, sort_index, organization)
          values
            (${row.id + org.offset}, ${row.name}, null, ${
			row.sort_index || 0
		}, ${org.name.toUpperCase()})
        `;
	}
}

async function opinion(org, maria) {
	const rows = await maria.query(`
        SELECT
            s.id,
            NULLIF(s.name, '') as title,
            NULLIF(s.description, '') as about,
            f.path as document_link,
            s.policy_id as opinion_group,
            str_to_date(concat(s.year,'-09-01'), '%Y-%m-%d') as published_at,
            IF(s.visible = 1, 'TRUE', 'FALSE') as published
        FROM standpoint s
        LEFT JOIN file f on s.file_id = f.id
        WHERE s.policy_id IS NOT NULL AND s.name NOT LIKE '';
    `);

	for (const row of rows) {
		await post`
          insert into opinion
            (id, title, about, document_link, opinion_group_id, published_at, published, organization)
          values
            (${row.id + org.offset}, ${row.title}, ${row.about}, ${row.document_link}, ${
			row.opinion_group + org.offset
		}, ${row.published_at}, ${row.published}, ${org.name.toUpperCase()})
        `;
	}
}

async function news(org, maria) {
	const rows = await maria.query(`
        SELECT
            n.id AS id,
            n.title AS title,
            n.text AS content,
            SUBSTRING(n.text, 1, 100) AS synopsis,
            IF(n.public = 1, 'TRUE', 'FALSE') AS published,
            n.date AS published_at,
            n.author AS author,
            i.path AS banner_image,
            i.name as banner_image_alt
        FROM news n
        LEFT JOIN image i on n.image_id = i.id;
    `);

	for (const row of rows) {
		await post`
          insert into news
            (id, title, content, synopsis, published, published_at, author, banner_image, banner_image_alt, organization)
          values
            (${row.id + org.offset}, ${row.title}, ${row.content}, ${row.synopsis}, ${
			row.published
		}, ${row.published_at}, ${row.author}, ${row.banner_image}, ${
			row.banner_image_alt
		}, ${org.name.toUpperCase()})
        `;
	}
}

async function questionCategory(org, maria) {
	const rows = await maria.query(`
        SELECT
            ASCII(SUBSTRING(fs.abbr, 1, 1)) * ASCII(SUBSTRING(fs.abbr, 2, 2)) as id,
            IF(fs.\`rank\` IS NULL, 0, fs.\`rank\`) as sort_index,
            fs.name as title,
            IF(fs.description = '', NULL, fs.description) as description,
            fs.abbr as slug
        FROM faq_subject fs;
    `);

	for (const row of rows) {
		console.log(parseInt(row.id));
		await post`
          insert into question_category
            (id, title, slug, organization, description, sort_index)
          values
            (${parseInt(row.id) + org.offset}, ${row.title}, ${
			row.slug
		}, ${org.name.toUpperCase()}, ${row.description}, ${row.sort_index})
        `;
	}
}

async function question(org, maria) {
	const rows = await maria.query(`
        SELECT
            f.id as id,
            f.title as question,
            f.text as answer,
            0 as sort_index,
            ASCII(SUBSTRING(s.abbr, 1, 1)) * ASCII(SUBSTRING(s.abbr, 2, 2)) as question_category_id
        FROM faq f
        LEFT JOIN faq_subsubject fs on fs.id = f.subsubject_id
        LEFT JOIN faq_subject s on fs.subject_abbr = s.abbr
        WHERE s.abbr IS NOT NULL;    
    `);

	for (const row of rows) {
		await post`
          insert into question
            (id, question, answer, organization, question_category_id, sort_index)
          values
            (${row.id + org.offset}, ${row.question}, ${row.answer}, ${org.name.toUpperCase()}, ${
			parseInt(row.question_category_id) + org.offset
		}, ${row.sort_index})
        `;
	}
}

async function group(org, maria) {
	const rows = await maria.query(`
        SELECT 
            g.abbr as id, 
            g.name, 
            IF(g.text = '', NULL, g.text) as description 
        FROM \`group\` g;
    `);

	for (const row of rows) {
		await post`
          insert into person_group
            (id, name, description, organization)
          values
            (${row.id.hashCode() + org.offset}, ${row.name}, ${
			row.description
		}, ${org.name.toUpperCase()})
        `;
	}
}

async function person(org, maria) {
	const rows = await maria.query(`
        SELECT s.id, s.first_name, s.last_name, i.path, s.email
        FROM stuver s
        LEFT JOIN image i on i.id = s.image_id;    
    `);

	for (const row of rows) {
		const name = `${row.first_name} ${row.last_name}`;
		await post`
          insert into person
            (id, name, image, mail, organization)
          values
            (${row.id + org.offset}, ${name}, ${row.path}, ${row.email}, ${org.name.toUpperCase()})
        `;
	}
}

async function position(org, maria) {
	const rows = await maria.query(`
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
    `);

	for (const row of rows) {
		await post`
          insert into person_position
            (year, name, sort_index, education, person_id, person_group_id, organization)
          values
            (${row.year}, ${row.name}, ${row.sort_index || 0}, ${row.education}, ${
			row.person_id + org.offset
		}, ${row.person_group.hashCode() + org.offset}, ${org.name.toUpperCase()})
        `;
	}
}

for (const org of organizations) {
	const maria = await mariadb.createConnection({
		host: 'gentsestudentenraad.be',
		user: org.name,
		password: org.name,
		database: `${org.name}-prod`,
		port: 80,
		connectionLimit: 5
	});

	await opinionGroup(org, maria).then(() => {
		console.log(`${org.name.toUpperCase()}: opinion groups`);
	});

	await opinion(org, maria).then(() => {
		console.log(`${org.name.toUpperCase()}: opinion`);
	});

	await news(org, maria).then(() => {
		console.log(`${org.name.toUpperCase()}: news`);
	});

	await questionCategory(org, maria).then(() => {
		console.log(`${org.name.toUpperCase()}: question category`);
	});

	await question(org, maria).then(() => {
		console.log(`${org.name.toUpperCase()}: question`);
	});

	await group(org, maria).then(() => {
		console.log(`${org.name.toUpperCase()}: group`);
	});

	await person(org, maria).then(() => {
		console.log(`${org.name.toUpperCase()}: person`);
	});

	await position(org, maria).then(() => {
		console.log(`${org.name.toUpperCase()}: position`);
	});

	await maria.end();
}
