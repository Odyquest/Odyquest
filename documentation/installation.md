# Installation

For providing a full Odyquest installation you need to install all three parts described below.
There is the possibility for a partial installation with limited features,
see section [partial installation](#partial-installation) for details.
For a simplified installation using docker, see the [corresponding section](#docker-installation)

To run all three parts on the same server, you can configure a reverse proxy (for example [using nginx](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/).

## App

Set up a web server like _Apache HTTP Server_ or _nginx_. Build the app with `npm run build:production` ([more details about building](../xaver-app/README.md)). Copy the content of [dist/xaver-app](../xaver-app/dist/xaver-app) to the correct folder of your web server like `/var/www`.

## CMS

Installing the CMS works similar to the App.

## Backend

Set up MongoDB instance.

The backend uses `nodejs` as server application. Build and run it like described in [README.md](../api-backend/README.md)

## Partial installation

You can run a stand alone version of the app or the cms.
It will use static files as data backend.
Therefor create a json file containing your chase description or use the example one.
Save it to `xaver-shared/assets/<id>` and update `xaver-shared/assets/chase-list.json`.
Build the project using `npm run build:static`.
Run the other steps described for the full installation above.
Note that app and cms uses a separate copy of the chase data. If you change it, you may want to rebuild both.

## Docker installation

