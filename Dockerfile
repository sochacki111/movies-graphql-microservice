FROM node:19-alpine3.15 AS development

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm i

COPY . .

EXPOSE 3001

FROM node:14 AS production

ARG NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app .

RUN npm run build && npm prune --production

EXPOSE 8080

CMD [ "npm",  "run", "start:prod" ]