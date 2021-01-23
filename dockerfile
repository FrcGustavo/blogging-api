FROM node:14

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY [".", "/usr/src/"]

EXPOSE 5000

RUN npm run build

CMD ["DEBUG=app:*", "node", "dist/server"]