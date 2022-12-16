FROM node:14.19.1-alpine3.15

WORKDIR ./app

COPY --chown=node:node . .

RUN npm install pm2 -g

CMD ["pm2-runtime", "start", "./src/main.js"]