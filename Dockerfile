FROM node:18.18.2

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .
