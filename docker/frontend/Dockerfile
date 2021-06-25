FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
# COPY htpasswd /etc/nginx/htpasswd
COPY build/xaver-app/ /usr/share/nginx/html/app
COPY build/xaver-cms/ /usr/share/nginx/html/cms

EXPOSE 80
