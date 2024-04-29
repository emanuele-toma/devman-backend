FROM node:20-alpine

# Install Docker client

RUN apk update

RUN apk add --update docker openrc

RUN rc-update add docker boot

# Install Docker Compose

RUN apk add docker-cli-compose

# Install git

RUN apk add git

