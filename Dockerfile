FROM node:20-alpine3.16 AS build
WORKDIR /app
ARG DATABASE_URL

# Dependencies
COPY ./package*.json ./
RUN npm ci

# Prisma type definitions
COPY prisma prisma
RUN npx prisma generate

# Everything that shouldn't be copied has to be in .dockerignore
COPY . .

RUN npm run build

################################################################################

FROM node:20-alpine3.16
WORKDIR /app

# Install run time dependencies.
COPY --from=build /app/package*.json ./
RUN npm ci --production --ignore-scripts

# Prisma type definitions
COPY prisma prisma
RUN npx prisma generate

# Migrate from build stage.
COPY --from=build /app/build ./

EXPOSE 3000
CMD ["node", "./index.js"]
