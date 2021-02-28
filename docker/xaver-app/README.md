# Docker image of xaver-app

## build docker image
* go to `<repo>/xaver-app`
* run `ng build --prod --localize`
* copy files from `dist/xaver-app` to `<location of this README.md>/build/xaver-app`
* build docker image: `sudo docker build -t xaver-app .`

## test it
* run docker container: `sudo docker run -p 80:80 xaver-app`
