# Docker image of odyquest-cms

## build docker image
* go to `<repo>/odyquest-cms`
* run `ng build --prod`
* copy files from `dist/odyquest-cms` to `<location of this README.md>/build/odyquest-cms`
* build docker image: `sudo docker build -t odyquest-cms .`

## test it
* run docker container: `sudo docker run -p 80:80 odyquest-cms`
