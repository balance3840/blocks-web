#/bin/bash

docker-compose up -d
docker exec -it blocks-node yarn
docker exec -it blocks-node yarn start