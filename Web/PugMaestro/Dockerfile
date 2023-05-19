FROM node:16-bullseye

WORKDIR /usr/src/app
RUN useradd -ms /bin/sh pug

RUN echo "HZU18{PUGMEISTER-PROMAESTRO}" > /home/pug/flag.txt && \
    chown root:pug /home/pug/flag.txt && \
    chmod 440 /home/pug/flag.txt

COPY package*.json ./

RUN npm install
COPY app.js app.js
COPY greeting.pug greeting.pug
COPY pug.jpg pug.jpg

RUN echo 'history -c' >> /home/pug/.bash_logout
RUN echo 'rm -rf /tmp/*' >>  /home/pug/.bash_logout
RUN echo 'rm -rf /home/pug/id' >> /home/pug/.bash_logout

EXPOSE 3000
CMD [ "node", "app.js" ]