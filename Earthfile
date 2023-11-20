VERSION 0.7
FROM debian:stable-slim

all:
    ARG env=dev
    ARG registry
    ARG tag=latest

    # Determine the final registry to push to
    IF [ "$registry" = "" ]
        ARG registry_final=$registry
    ELSE
        ARG registry_final=${registry}/
    END

    # Build and tag all Docker images
    BUILD ./voting-center-frontend+docker --env=${env} --tag=$tag --registry=$registry_final
    BUILD ./voting-center-backend+docker --env=${env} --tag=$tag --registry=$registry_final

test:
    FROM node:16-alpine
    WORKDIR /tests
    COPY ./voting-center-automation/docker-compose.yml ./
    WITH DOCKER \
        --compose docker-compose.yml \
        --pull postgres:14 \
        --load voting-center-backend:latest=+docker \
        --load voting-center-automation:latest=+docker \
        --allow-privileged
        RUN npm run api-test-dreps -p voting-center-automation
     END