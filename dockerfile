FROM node:20-alpine3.17

WORKDIR /app

COPY README.md  app.js  dockerfile   package.json   tasks.db  /app/
COPY public /app/public

RUN npm install

EXPOSE 3000

CMD ["node","app.js"]

