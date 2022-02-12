FROM ubuntu:latest

RUN apt update && apt install -y curl jq
WORKDIR /home/ubuntu/Odyquest/tests/odyquest-data-backend
CMD [ "./api-test-script.sh" ]
