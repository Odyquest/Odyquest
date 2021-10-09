# Docker image of odyquest-app

## build docker image
* go to `<repo>/odyquest-app`
* run `ng build --prod --localize`
* copy files from `dist/odyquest-app` to `<location of this README.md>/build/odyquest-app`
* build docker image: `sudo docker build -t odyquest-app .`

## test it
* run docker container: `sudo docker run -p 80:80 odyquest-app`
