#Build Stage
FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

#Prod Stage
FROM node:16-alpine

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN yarn install --only=production

RUN rm package*.json

EXPOSE 3000

CMD ["node", "dist/main"]

