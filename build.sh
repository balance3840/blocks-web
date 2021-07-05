#!/bin/bash

docker-compose up -d --build --force-recreate
echo "Instalando dependencias y generando build"
docker exec blocks-node yarn build-docker