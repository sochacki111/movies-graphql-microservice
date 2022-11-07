FROM node:19-alpine3.15

ENV NODE_ENV=prod

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm i

COPY . .

RUN npm run build && npm prune --production

EXPOSE 3001

CMD [ "npm",  "run", "start:prod" ]