FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY certificates/localhost.crt /etc/nginx/certificates/localhost.crt
COPY certificates/localhost.key /etc/nginx/certificates/localhost.key

WORKDIR /usr/share/nginx/html
COPY target/build .
