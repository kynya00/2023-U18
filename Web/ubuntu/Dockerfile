FROM php:7.0-cli
COPY flag /flag
RUN chmod a=r /flag
COPY src/ /home
WORKDIR /home
CMD ["/bin/sh","/home/run.sh"]
EXPOSE 9191
