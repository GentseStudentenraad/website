# Gentse Studentenraad

> Deze readme is een _work-in-progress_.

## Development

Om aan de website te sleutelen moet je beschikken over een PostgreSQL databank en een NodeJS installatie. De volgende stappen gaan ervan uit dat je reeds over deze software beschikt en alvast eens `npm install` uitvoert.

> In de toekomst zal je een directe verbinding kunnen maken met de _production_ databank, of een _development_ databank die we op een van onze servers draaien.

### Databank/ORM initialiseren

Het project maakt gebruik van Prisma ORM. A.d.h.v. `/prisma/schema.prisma` modelleren we hoe het schema eruit hoeft te zien. Wanneer je deze in jouw databank wilt laden maak je gebruik van het commando `npx prisma migrate dev`. Vervolgens kan je de TypeScript types genereren met `npx prisma generate`.

Om data in te laden gebruiken we voorlopig `/migrate/index.js`. Dit is een NodeJS script dat gegevens ophaalt uit de oude MariaDB instantie, en deze in jouw PostgreSQL databank laadt.

### SvelteKit starten

Je hoeft uitsluitend `npm run dev` uit te voeren, waarna de development server gestart wordt.

## CI/CD

TODO

## Deployment

TODO
