FROM php:7.4-apache

RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    && docker-php-ext-install pdo_sqlite \
    && docker-php-ext-enable pdo_sqlite

WORKDIR /var/www/html/
COPY . . 

EXPOSE 80
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]