FROM node:19-alpine

WORKDIR /usr/src/app

ENV FLAG HZU18{pr0toTYp3_pollut10n_1s_W3LL_3xpl0ited}

COPY package*.json ./
RUN npm install
COPY server.js .

EXPOSE 3000
CMD [ "npm", "start"]
