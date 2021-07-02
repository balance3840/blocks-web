#!/bin/bash

docker-compose up -d --build --force-recreate
docker exec -it blocks-node yarn build-docker