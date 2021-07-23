FROM nginx:1.21.0-alpine

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

RUN mkdir /var/www/html -p && touch /var/www/html/index.php

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

