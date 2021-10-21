# Docker Image for App and Cms

## Build Docker Image
* Get files for app
  * go to `<repo>/odyquest-app`
  * run `npm run build:production` or `npm run build:static`
  * copy files from `dist/odyquest-app` to `<location of this README.md>/build/odyquest-app`
* Get files for cms:
  * go to `<repo>/odyquest-cms`
  * run `npm run build:production` or `npm run build:static`
  * copy files from `dist/odyquest-cms` to `<location of this README.md>/build/odyquest-cms`
* Build docker image: `sudo docker build -t odyquest-frontend .`

## Test it

* Run docker container: `sudo docker run -p 80:80 odyquest-frontend`
* Open <http://localhost:80/> for app and <http://localhost:80/cms> for cms
* Use static build for usage without data backend.

