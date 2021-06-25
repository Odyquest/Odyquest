# Docker image for app and cms

## Build docker image
* get files for app
  * go to `<repo>/xaver-app`
  * run `npm run build:production` or `npm run build:static`
  * copy files from `dist/xaver-app` to `<location of this README.md>/build/xaver-app`
* get files for cms
  * go to `<repo>/xaver-cms`
  * run `npm run build:production` or `npm run build:static`
  * copy files from `dist/xaver-cms` to `<location of this README.md>/build/xaver-cms`
* build docker image: `sudo docker build -t odyquest-frontend .`

## Test it
* run docker container: `sudo docker run -p 80:80 odyquest-frontend`
* open <http://localhost:80/> for app and <http://localhost:80/cms> for cms

## Password protection for cms
There is outcommented code for simple password protection if needed.
