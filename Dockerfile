FROM node:16-alpine AS build
WORKDIR /app

# Dependencies
COPY ./package*.json ./
RUN npm ci
RUN npm audit fix

# Prisma type definitions
COPY prisma prisma
RUN npx prisma generate

# Everything that shouldn't be copied has to be in .dockerignore
COPY . .

RUN npm run build

################################################################################

FROM node:16-alpine
WORKDIR /app

# Install run time dependencies.
COPY --from=build /app/package*.json ./
RUN npm ci --production --ignore-scripts
RUN npm audit fix

# Prisma type definitions
COPY prisma prisma
RUN npx prisma generate

# Migrate from build stage.
COPY --from=build /app/build ./

EXPOSE 3000
CMD ["node", "./index.js"]
