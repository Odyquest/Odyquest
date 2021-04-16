# Docker image of xaver-app

## build docker image
* go to `<repo>/xaver-cms`
* run `ng build --prod`
* copy files from `dist/xaver-cms` to `<location of this README.md>/build/xaver-cms`
* build docker image: `sudo docker build -t xaver-cms .`

## test it
* run docker container: `sudo docker run -p 80:80 xaver-cms`
