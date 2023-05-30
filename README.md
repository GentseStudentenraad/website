# Gentse Studentenraad

[![Build Status](https://ci.gentsestudentenraad.be/api/badges/GentseStudentenraad/website/status.svg?ref=refs/heads/main)](https://ci.gentsestudentenraad.be/GentseStudentenraad/website)

> Deze readme is een _work-in-progress_.

## Development

Om aan de website te sleutelen moet je beschikken over een PostgreSQL databank en een NodeJS installatie. De volgende stappen gaan ervan uit dat je reeds over deze software beschikt en alvast eens `npm install` uitvoert.

> In de toekomst zal je een directe verbinding kunnen maken met de _production_ databank, of een _development_ databank die we op een van onze servers draaien.

### Databank/ORM initialiseren

Het project maakt gebruik van Prisma ORM. Aan de hand van `prisma/schema.prisma` modelleren we de verschillende tabellen in onze databank. Wanneer je deze wilt inladen maak je gebruik van het commando `npx prisma migrate dev`. Vervolgens kan je de ORM code genereren met `npx prisma generate`.

Om data in te laden gebruiken we voorlopig `migrate/index.ts`. Dit is een NodeJS script dat gegevens ophaalt uit de oude MariaDB instantie, en deze in jouw PostgreSQL databank laadt. Je kan deze oproepen met `npm run migrate`.

### SvelteKit opstarten

Je hoeft uitsluitend `npm run dev` uit te voeren, waarna de development server gestart wordt. Een _production_ versie simuleren kan je aan de hand van de combinatie van commando's `npm run build` en `npm run preview`.

## CI/CD

We maken gebruik van het Drone CI platform. Momenteel testen we bij elke push en iedere pull request of de code conform de style guidelines is en of de applicatie compileert.

## Deployment

Bij iedere push naar `main` worden voorlopig nog de _staging_ websites geüpdatet. Wanneer een specifieke build in Drone gepromoveerd wordt naar `production` zal deze ook op de hoofddomeinnamen online gebracht worden.

> Momenteel zijn we nog niet overgeschakeld, waardoor een build nog niet gepromoveerd kan worden. Ook het `.drone.yml` bestand dient hiervoor nog uitgebreid te worden.
