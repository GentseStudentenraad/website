# Migrating MariaDB to PostgreSQL

Since the new database schema will not be a one-to-one mapping of the existing one, the data has to be exported manually. These SQL `SELECT` queries should help a bit.

### OpinionGroup

```sql
SELECT
    p.id as id,
    p.name as name,
    p.`rank` as sort_index,
    null as about
FROM policy p;
```

### Opinions

```sql
SELECT
    s.id,
    NULLIF(s.name, '') as title,
    NULLIF(s.description, '') as about,
    f.path as document_link,
    s.policy_id as opinion_group,
    str_to_date(concat(s.year,'-09-01'), '%Y-%m-%d') as published_at,
    IF(s.visible = 1, 'TRUE', 'FALSE')as published
FROM standpoint s
LEFT JOIN file f on s.file_id = f.id
WHERE s.policy_id IS NOT NULL AND s.name NOT LIKE '';
```
