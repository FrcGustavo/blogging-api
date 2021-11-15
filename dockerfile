FROM node:14

COPY ["package.json", "yarn.lock", "/usr/src/"]

WORKDIR /usr/src

RUN yarn

COPY [".", "/usr/src/"]

EXPOSE 5000

RUN yarn build

CMD ["yarn", "run", "start"]