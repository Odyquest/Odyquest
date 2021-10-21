FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
# COPY htpasswd /etc/nginx/htpasswd
COPY build/odyquest-app/ /usr/share/nginx/html/app
COPY build/odyquest-cms/ /usr/share/nginx/html/cms

EXPOSE 80
